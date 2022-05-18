import { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { ActionSheet, Dialog, Icon, NavBar, Toast } from 'react-vant'
import { ActionSheetProps } from 'react-vant/es/action-sheet'

import Layout from '@/components/Layout'
import UserCard from './UserCard'
import { userService } from '@/services'
import { IMeeting, IUser } from '@/models/types'
import { MtimeOrder } from '@/models/enums'
import { filterSameKey } from '@/libs/utils'
import styles from './style.module.less'
import PullToRefresh from '@/components/PullToRefresh'
import MeetingRecord from '@/components/MeetingRecord'

function Menu(props: ActionSheetProps) {
  const history = useHistory()
  const actions = [{ name: '退出登录' }]

  const { run: logout } = useRequest(userService.logout, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        Toast.success('退出登录')
        history.replace('/')
      }
    }
  })

  return (
    <ActionSheet
      cancelText='取消'
      actions={actions}
      onSelect={(item, index) => {
        if (index === 0) {
          Dialog.confirm({
            message: '是否退出登录'
          }).then(() => {
            // on confirm
            logout()
          }).catch(() => {
            // on cancel
          })
        }
      }}
      {...props}
    />
  )
}

export default function Me() {
  const history = useHistory()
  const limit = useRef(10)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [user, setUser] = useState<IUser>()
  const [meetings, setMeetings] = useState<IMeeting[]>([])
  const [sort, setSort] = useState(MtimeOrder.desc)
  const [visible, setVisible] = useState(false)
  useRequest(userService.info, {
    onSuccess: data => {
      if (data.stat !== 'OK') {
        history.replace('/login')
      } else if (data.stat === 'OK') {
        setUser(data.data)
      }
    }
  })

  const { run: loadM } = useRequest(userService.meetings, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        setMeetings(val => [...val, ...filterSameKey(data.data.rows, val, '_id')])
        setTotal(data.data.total)
        setHasMore(data.data.rows.length >= limit.current)
      }
    }
  })

  const loadMoreMeetings = async () => {
    try {
      await loadM({
        offset: meetings.length,
        limit: limit.current,
        order: [sort]
      })
    } catch (error) {
      console.trace(error)
    }
  }
  return (
    <Layout
      showNav={false}
      showTab={true}
    >
      <NavBar
        title='个人中心'
        rightText={<Icon name='ellipsis'/>}
        onClickRight={() => setVisible(true)}
      />
      <div className={styles.wrap}>
        <UserCard
          user={user}
        />
      </div>
      <PullToRefresh
        onRefresh={async () => {
          setMeetings([])
          setHasMore(true)
        }}
      >
        <MeetingRecord
          hasMore={hasMore}
          loadMore={loadMoreMeetings}
          meetings={meetings}
          total={total}
          sort={sort}
          setSort={(order) => {
            setSort(order)
            setMeetings([])
            setHasMore(true)
          }}
        />
      </PullToRefresh>
      <Menu visible={visible} onCancel={() => setVisible(false)} />
    </Layout>
  )
}
