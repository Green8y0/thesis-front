import { useState, useRef } from 'react'
import { useRequest } from 'ahooks'
import { Sticky } from 'react-vant'

import { roomsService } from '@/services'
import { IRoom } from '@/models/types'
import { screenFilter } from '@/models/enums'
import Layout from '@/components/Layout'
import PullToRefresh from '@/components/PullToRefresh'
import SearchBar from '@/components/SearchBar'
import RoomCard from './RoomCard'
import FiltrateBar from './FiltrateBar'

const getHasScreen = (val?: screenFilter) => {
  // if (val === screenFilter.unlimit) return undefined
  if (val === screenFilter.true) return true
  if (val === screenFilter.false) return false
  return undefined
}

export default function Rooms() {
  const limit = useRef(10)
  const [hasMore, setHasMore] = useState(true)
  const [rooms, setRooms] = useState<IRoom[]>([])
  const [searchVal, setSearchVal] = useState('')
  const [filterVal, setFilterVal] = useState<Record<string, string | number>>({})

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
        hasScreen: getHasScreen(filterVal.hasScreen as screenFilter),
        name: searchVal || undefined,
        offset: rooms.length,
        limit: limit.current
      })
    } catch (error) {
      console.trace(error)
    }
  }

  const setValue = (val: string) => {
    setHasMore(true)
    setRooms([])
    setSearchVal(val)
  }

  return (
    <Layout
      showNav={false}
      showTab={true}
    >
      <Sticky>
        <SearchBar
          placeholder='请输入内容'
          value={searchVal}
          setValue={setValue}
          onClear={setValue}
        />
        <FiltrateBar
          value={filterVal}
          setValue={(v) => {
            setHasMore(true)
            setRooms([])
            setFilterVal(v)
          }}
        />
      </Sticky>
      <PullToRefresh
        onRefresh={async () => {
          setRooms([])
          setHasMore(true)
        }}
      >
        <RoomCard rooms={rooms}
          loadMore={loadMoreRooms}
          hasMore={hasMore}
        />
      </PullToRefresh>
    </Layout>
  )
}
