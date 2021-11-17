import {
  Card,
  Space
} from 'antd-mobile'
import { CommentOutlined, RightOutlined } from '@ant-design/icons'

import LocationIcon from '@/components/Icon/LocationIcon'
import { IRoom } from '@models/types'
import styles from './style.module.less'

interface Props {
  rooms: IRoom[]
}

const CardHeader = ({ item }: {
  item: IRoom
}) => {
  return (
    <Space
      className={styles.header}
      size='1rem'
      align='center'
    >
      <CommentOutlined className={styles.icon} />
      <div>
        {item.name}
      </div>
    </Space>
  )
}

export default function RoomCard({ rooms }: Props) {
  return (
    <Space direction='vertical' block
      size='1rem'
      className={styles.body}
    >
      {rooms?.map(item => (
        <Card
          key={item._id}
          className={styles.card}
          title={<CardHeader item={item} />}
          extra={<RightOutlined style={{ fontSize: '1.5rem' }} />}
        >
          <Space block
            size='1rem'
            className={styles.content}
          >
            <LocationIcon/>
            {item.location}
          </Space>
        </Card>
      ))}
    </Space>
  )
}
