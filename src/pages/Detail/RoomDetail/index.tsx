import { Cell } from 'react-vant'
import { IRoom } from '@/models/types'

interface Props {
  room: IRoom
}

export default function RoomDetail({ room }: Props) {
  return (
    <Cell.Group style={{ marginBottom: '0.1rem' }}>
      <Cell
        icon='comment-o'
        title='会议室' value={room.name}
      />
      <Cell
        icon='location-o'
        title='地点' value={room.location}
      />
      <Cell
        icon='friends-o'
        title='人数' value={room.capacity}
      />
      <Cell
        icon='tv-o'
        title='显示屏' value={room.hasScreen ? '有显示屏' : '无显示屏'}
      />
    </Cell.Group>
  )
}
