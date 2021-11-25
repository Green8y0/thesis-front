import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRequest } from 'ahooks'

import RoomDetail from './RoomDetail'
import MeetingRecord from './MeetingRecord'
import Layout from '@/components/Layout'
import { IMeeting, IRoom } from '@/models/types'
import { meetingsService } from '@/services'
import { filterSameKey } from '@/libs/utils'

interface ILocationState {
  room: IRoom
}

export default function Detail() {
  const location = useLocation<ILocationState>()
  const room = useRef(location.state.room)
  const [meetings, setMeetings] = useState<IMeeting[]>([])
  const [total, setTotal] = useState(0)

  useRequest(meetingsService.list, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        setMeetings(val => [...val, ...filterSameKey(data.data.rows, val, '_id')])
      }
    }
  })
  return (
    <Layout
      showNav={true}
      showTab={false}
      navText='会议室'
    >
      <RoomDetail
        room={room.current}
      />
      <MeetingRecord
        meetings={meetings}
        total={total}
      />
    </Layout>
  )
}
