import {
  Space
} from 'antd-mobile'
import { UserOutlined } from '@ant-design/icons'
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
    <Space block direction='vertical'
      align='center'
      size='1rem'
    >
      <UserOutlined className={styles.icon} />
      <Space className={styles['item-icon']}
        align='center'
        size='0.5rem'
      >
        <UserOutlined/>
        <div className={styles.nickname}>{user?.nickname}</div>
      </Space>
      <Space className={styles['item-icon']}
        align='center'
        size='0.5rem'
      >
        <IdIcon/>
        <div className={styles.nickname}>{user?.phoneNum}</div>
      </Space>
    </Space>
  )
}
