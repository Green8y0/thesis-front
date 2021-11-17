import { useState, useRef } from 'react'
import { useRequest } from 'ahooks'
import {
  InfiniteScroll
} from 'antd-mobile'

import { roomsService } from '@/services'
import { IRoom } from '@/models/types'
import Layout from '@/components/Layout'
import PullRefresh from '@/components/PullRefresh'
import RoomCard from './RoomCard'

export default function Rooms() {
  const limit = useRef(10)
  const [hasMore, setHasMore] = useState(true)
  const [rooms, setRooms] = useState<IRoom[]>([])

  const { run: loadRooms } = useRequest(roomsService.list, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        setRooms(val => [...val, ...data.data.rows])
        setHasMore(data.data.rows.length >= limit.current)
      }
    }
  })

  const loadMoreRooms = async () => {
    try {
      await loadRooms({
        offset: rooms.length,
        limit: limit.current
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
      <PullRefresh
        onRefresh={async () => {
          setRooms([])
          setHasMore(true)
        }}
      >
        <RoomCard rooms={rooms} />
        <InfiniteScroll loadMore={loadMoreRooms} hasMore={hasMore} />
      </PullRefresh>
    </Layout>
  )
}
