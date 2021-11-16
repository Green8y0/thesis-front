import { useState, useRef } from 'react'
import { useRequest } from 'ahooks'
import {
  Card
} from 'antd-mobile'

import { roomsService } from '@/services'
import { IRooms } from '@/models/types'
import Layout from '@/components/Layout'
import PullRefresh from '@/components/PullRefresh'

export default function Rooms() {
  const limit = useRef(10)
  const [hasMore, setHasMore] = useState(false)
  const [rooms, setRooms] = useState<IRooms[]>([])

  const { run: loadRooms } = useRequest(roomsService.list, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        setRooms(data.data.rows)
      }
    }
  })

  const loadMoreReply = async () => {
    try {
      await loadRooms({
        offset: rooms.length,
        limit: limit.current
      })
    } catch (error) {
      console.trace(error)
    }
  }

  // useMount(() => {
  //   run({})
  // })
  return (
    <Layout
      showNav={false}
      showTab={true}
    >
      <PullRefresh
        onRefresh={async () => {
          setHasMore(true)
          setRooms([])
        }}
      >
        {rooms?.map(item => (
          <Card
            key={item._id}
            title={item.name}
          ></Card>
        ))}
      </PullRefresh>
    </Layout>
  )
}
