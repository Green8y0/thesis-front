import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRequest } from 'ahooks'

import RoomDetail from './RoomDetail'
import MeetingRecord from './MeetingRecord'
import Layout from '@/components/Layout'
import PullToRefresh from '@/components/PullToRefresh'
import { IMeeting, IRoom } from '@/models/types'
import { MtimeOrder } from '@/models/enums'
import { meetingsService } from '@/services'
import { filterSameKey } from '@/libs/utils'

interface ILocationState {
  room: IRoom
}

export default function Detail() {
  const location = useLocation<ILocationState>()
  const limit = useRef(10)
  const room = useRef(location.state.room)
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

  const loadMoreRooms = async () => {
    try {
      await loadM({
        roomsIds: [room.current._id],
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
      <RoomDetail
        room={room.current}
      />
      <PullToRefresh
        onRefresh={async () => {
          setMeetings([])
          setHasMore(true)
        }}
      >
        <MeetingRecord
          hasMore={hasMore}
          loadMore={loadMoreRooms}
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
