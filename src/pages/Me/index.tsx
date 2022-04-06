import { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useRequest } from 'ahooks'

import Layout from '@/components/Layout'
import UserCard from './UserCard'
import { userService } from '@/services'
import { IMeeting, IUser } from '@/models/types'
import { MtimeOrder } from '@/models/enums'
import { filterSameKey } from '@/libs/utils'
import styles from './style.module.less'
import PullToRefresh from '@/components/PullToRefresh'
import MeetingRecord from '@/components/MeetingRecord'

export default function Me() {
  const history = useHistory()
  const limit = useRef(10)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [user, setUser] = useState<IUser>()
  const [meetings, setMeetings] = useState<IMeeting[]>([])
  const [sort, setSort] = useState(MtimeOrder.desc)
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
    </Layout>
  )
}
