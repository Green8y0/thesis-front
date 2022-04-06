import { List, Icon } from 'react-vant'
import { ListProps, ListInstance } from 'react-vant/es/list'
import IdIcon from '@/components/Icon/IdIcon'
import { IUser } from '@/models/types'

import styles from './style.module.less'

interface Props {
  listProps: ListProps
  users?: IUser[]
  listRef?: React.Ref<ListInstance>
}

export default function UserPicker({
  users,
  listProps,
  listRef
}: Props) {
  return (
    <List
      ref={listRef}
      errorText='请求失败，点击重新加载'
      {...listProps}
    >
      {users?.map(user => (
        <div className={styles.item} key={user._id}>
          <div className={styles['item-icon']}>
            <Icon name='user-o' className={styles.img} />
            <div className={styles.nickname}>{user?.nickname}</div>
          </div>
          <div className={styles['item-icon']}>
            <IdIcon className={styles.img} />
            <div className={styles.nickname}>{user?.phoneNum}</div>
          </div>
        </div>
      ))}
    </List>
  )
}
