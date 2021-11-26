import { useHistory } from 'react-router-dom'
import {
  Cell,
  List
} from 'react-vant'
import { ListInstance } from 'react-vant/es/list'

import { IRoom } from '@models/types'
import styles from './style.module.less'

interface Props {
  rooms: IRoom[]
  finished: boolean
  listRef?: React.Ref<ListInstance>
  loadMore: () => Promise<void>
}

const CardHeader = ({ item, onClick }: {
  item: IRoom
  onClick?: () => void
}) => {
  return (
    <Cell
      icon='comment-o'
      value={item.name}
      isLink
      onClick={() => onClick && onClick()}
    >
    </Cell>
  )
}

const CardContent = ({ item }: {
  item: IRoom
}) => {
  return (
    <>
      <Cell
        icon='location-o'
        value={item.location}
      >
      </Cell>
      <Cell
        icon='friends-o'
        value={item.capacity}
      ></Cell>
      <Cell
        icon='tv-o'
        value={item.hasScreen ? '有显示屏' : '无显示屏'}
      ></Cell>
    </>
  )
}

export default function RoomCard({
  rooms, finished, listRef,
  loadMore
}: Props) {
  const history = useHistory()
  return (
    <List finished={finished} onLoad={loadMore}
      errorText='请求失败，点击重新加载'
      ref={listRef}
    >
      {rooms?.map(item => (
        <Cell.Group inset
          key={item._id}
          className={styles.card}
        >
          <CardHeader item={item}
            onClick={() => history.push(`/detail/${item._id}`, { room: item })}
          />
          <CardContent item={item} />
        </Cell.Group>
      ))}
    </List>
  )
}
