import {
  Icon
} from 'react-vant'
import IdIcon from '@/components/Icon/IdIcon'
import { IUser } from '@models/types'
import styles from './style.module.less'

interface Props {
  user?: IUser
}

export default function UserCard({
  user
}: Props) {
  return (
    <div className={styles.all}>
      <Icon name='user-o' className={styles.icon} />
      <div className={styles['item-icon']}>
        <Icon name='user-o' />
        <div className={styles.nickname}>{user?.nickname}</div>
      </div>
      <div className={styles['item-icon']}>
        <IdIcon/>
        <div className={styles.nickname}>{user?.phoneNum}</div>
      </div>
    </div>
  )
}
