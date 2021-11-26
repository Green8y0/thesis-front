import { useState, useRef } from 'react'
import { useRequest } from 'ahooks'
import { Sticky } from 'react-vant'
import { ListInstance } from 'react-vant/es/list'

import { roomsService } from '@/services'
import { IMenu, IRoom } from '@/models/types'
import { MemberFilter, ScreenFilter } from '@/models/enums'
import Layout from '@/components/Layout'
import PullToRefresh from '@/components/PullToRefresh'
import SearchBar from '@/components/SearchBar'
import RoomCard from './RoomCard'
import FiltrateBar from '../../components/FiltrateBar'

const menus: IMenu[] = [
  {
    name: 'hasScreen',
    placeholder: '显示屏',
    options: [
      { text: '不限', value: ScreenFilter.unlimit },
      { text: '有显示屏', value: ScreenFilter.true },
      { text: '无显示屏', value: ScreenFilter.false }
    ]
  },
  {
    name: 'capacity',
    placeholder: '人数',
    options: [
      { text: '不限', value: MemberFilter.unlimit },
      { text: '0-20人', value: MemberFilter.twenty },
      { text: '21-99人', value: MemberFilter.ninetyNine },
      { text: '100-499人', value: MemberFilter.max }
    ]
  }
]

const getHasScreen = (val?: ScreenFilter) => {
  // if (val === ScreenFilter.unlimit) return undefined
  if (val === ScreenFilter.true) return true
  if (val === ScreenFilter.false) return false
  return undefined
}

export default function Rooms() {
  const limit = useRef(10)
  const [finished, setFinished] = useState(false)
  const listRef = useRef<ListInstance>(null)
  const [rooms, setRooms] = useState<IRoom[]>([])
  const [searchVal, setSearchVal] = useState('')
  const [filterVal, setFilterVal] = useState<Record<string, string | number>>({})

  const { run: loadRooms } = useRequest(roomsService.list, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        setRooms(val => [...val, ...data.data.rows])
        setFinished(data.data.rows.length < limit.current)
      }
    }
  })

  const loadMoreRooms = async () => {
    try {
      await loadRooms({
        hasScreen: getHasScreen(filterVal.hasScreen as ScreenFilter),
        name: searchVal || undefined,
        offset: rooms.length,
        limit: limit.current
      })
    } catch (error) {
      console.trace(error)
    }
  }

  const setValue = (val: string) => {
    setFinished(false)
    setRooms([])
    setSearchVal(val)
  }

  const refresh = async (fn?: () => void) => {
    return new Promise(resolve => {
      setFinished(false)
      setRooms([])
      fn && fn()
      resolve('')
    }).then(() => {
      listRef.current?.check()
    })
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
          menus={menus}
          value={filterVal}
          onChange={(v) => {
            refresh(() => {
              setFilterVal(v)
            })
          }}
        />
      </Sticky>
      <PullToRefresh
        onRefresh={async () => {
          refresh()
        }}
      >
        <RoomCard
          listRef={listRef}
          rooms={rooms}
          loadMore={loadMoreRooms}
          finished={finished}
        />
      </PullToRefresh>
    </Layout>
  )
}
