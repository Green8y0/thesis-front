import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useRequest } from 'ahooks'
import {
  Cell,
  Icon
} from 'react-vant'

import { CellProps } from 'react-vant/es/cell'

import Layout from '@/components/Layout'
import { userService } from '@/services'
import { filterSameKey } from '@/libs/utils'
import { RoleType } from '@/models/enums'
import styles from './style.module.less'

interface ITab extends CellProps {
  key: string
}

export default function Meetings() {
  const history = useHistory()

  const extraTabs: ITab[] = [{
    key: 'addRoom',
    value: '新增会议室',
    icon: <Icon name='cluster-o' size='0.5rem' />,
    onClick: () => history.push('/room/add')
  }]

  const [tabs, setTabs] = useState<ITab[]>([{
    key: 'reserveRoom',
    value: '预定会议室',
    icon: <Icon name='calendar-o' size='0.5rem' />
  }])

  // 根据用户权限设置是否可新增会议室
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
                onClick={item.onClick}
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
