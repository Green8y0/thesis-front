import { ReactNode, useState } from 'react'
import { useRequest } from 'ahooks'
import {
  Cell,
  Icon
} from 'react-vant'

import Layout from '@/components/Layout'
import { userService } from '@/services'
import { filterSameKey } from '@/libs/utils'
import { RoleType } from '@/models/enums'
import styles from './style.module.less'

interface ITab {
  key: string
  value: string
  icon: string | ReactNode
}

const extraTabs: ITab[] = [
  {
    key: 'addRoom',
    value: '新增会议室',
    icon: <Icon name='cluster-o' size='0.5rem' />
  },
  {
    key: 'editRoom',
    value: '编辑会议室',
    icon: <Icon name="records" size='0.5rem' />
  }
]

export default function Meetings() {
  const [tabs, setTabs] = useState<ITab[]>([{
    key: 'reserveRoom',
    value: '预定会议室',
    icon: <Icon name='calendar-o' size='0.5rem' />
  }])

  useRequest(userService.info, {
    onSuccess: data => {
      if (data.stat === 'OK' && data.data.role !== RoleType.common) {
        setTabs(val => [...val, ...filterSameKey(extraTabs, val, 'key')])
      }
    }
  })

  return (
    <Layout
      showNav={false}
      showTab={true}
    >
      <div className={styles.all}>
        {
          tabs.map(item => (
            <Cell.Group inset
              key={item.key}
              className={styles.card}
            >
              <Cell
                size='large'
                icon={item.icon}
                title=''
                value={item.value}
                className={styles.line}
                valueClass={styles.title}
              />
            </Cell.Group>
          ))
        }
      </div>
    </Layout>
  )
}
