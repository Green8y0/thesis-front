import {
  Icon,
  Skeleton
} from 'react-vant'
import { IUser } from '@models/types'
import styles from './style.module.less'

interface Props {
  user?: IUser
}

export default function UserCard({
  user
}: Props) {
  return (
    <Skeleton avatar loading={!user}>
      <div className={styles.all}>
        <div className={styles.avatar}>
          <div className={styles.font}>{user?.nickname.slice(0, 2)}</div>
        </div>
        <div className={styles.item}>
          <div className={styles['item-icon']}>
            <Icon name='user-o' className={styles.img} />
            <div className={styles.nickname}>{user?.nickname}</div>
          </div>
          <div className={styles['item-icon']}>
            <Icon name='phone-o' className={styles.img} />
            <div className={styles.nickname}>{user?.phoneNum}</div>
          </div>
        </div>
      </div>
    </Skeleton>
  )
}
