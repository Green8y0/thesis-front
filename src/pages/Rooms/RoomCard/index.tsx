import {
  Cell,
  List
} from 'react-vant'

import LocationIcon from '@/components/Icon/LocationIcon'
import { IRoom } from '@models/types'
import styles from './style.module.less'

interface Props {
  rooms: IRoom[]
  hasMore: boolean
  loadMore: () => Promise<void>
}

const CardHeader = ({ item }: {
  item: IRoom
}) => {
  return (
    <Cell
      icon='comment-o'
      value={item.name}
      isLink
    >
    </Cell>
  )
}

export default function RoomCard({
  rooms,
  hasMore,
  loadMore
}: Props) {
  return (
    <List finished={!hasMore} onLoad={loadMore}>
      {rooms?.map(item => (
        <Cell.Group inset
          key={item._id}
          className={styles.card}
        >
          <CardHeader item={item} />
          <Cell
            icon={<LocationIcon/>}
            value={item.location}
          >
          </Cell>
        </Cell.Group>
      ))}
    </List>
  )
}
