import { useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'

import RoomDetail from './RoomDetail'
import MeetingRecord from './MeetingRecord'
import Layout from '@/components/Layout'
import PullToRefresh from '@/components/PullToRefresh'
import { IMeeting, IRoom } from '@/models/types'
import { MtimeOrder } from '@/models/enums'
import { meetingsService, roomsService } from '@/services'
import { filterSameKey } from '@/libs/utils'

interface ILocationState {
  room: IRoom
}
interface Params {
  id: string
}

export default function Detail() {
  const location = useLocation<ILocationState>()
  const { id } = useParams<Params>()
  const limit = useRef(10)
  const [room, setRoom] = useState(location.state?.room)
  const [hasMore, setHasMore] = useState(true)
  // 会议信息
  const [meetings, setMeetings] = useState<IMeeting[]>([])
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState(MtimeOrder.desc)

  const { run: loadM } = useRequest(meetingsService.list, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        setMeetings(val => [...val, ...filterSameKey(data.data.rows, val, '_id')])
        setTotal(data.data.total)
        setHasMore(data.data.rows.length >= limit.current)
      }
    }
  })
  useRequest(roomsService.list, {
    ready: !!id,
    onSuccess: data => {
      if (data.stat === 'OK' && data.data.rows.length > 0) {
        setRoom(data.data.rows[0])
      }
    }
  })

  const loadMoreMeetings = async () => {
    try {
      await loadM({
        roomsIds: [id],
        offset: meetings.length,
        limit: limit.current,
        order: [sort]
      })
    } catch (error) {
      console.trace(error)
    }
  }
  return (
    <Layout
      showNav={true}
      showTab={false}
      navText='会议室'
    >
      {room &&
        <RoomDetail
          room={room}
        />
      }
      <PullToRefresh
        onRefresh={async () => {
          setMeetings([])
          setHasMore(true)
        }}
      >
        <MeetingRecord
          hasMore={hasMore}
          loadMore={loadMoreMeetings}
          meetings={meetings}
          total={total}
          sort={sort}
          setSort={(order) => {
            setSort(order)
            setMeetings([])
            setHasMore(true)
          }}
        />
      </PullToRefresh>
    </Layout>
  )
}
