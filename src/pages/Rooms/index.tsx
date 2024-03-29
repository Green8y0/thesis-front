import { useState, useRef } from 'react'
import { useRequest } from 'ahooks'
import { Sticky } from 'react-vant'
import { ListInstance } from 'react-vant/es/list'
import { DropdownMenuItemProps } from 'react-vant/es/dropdown-menu/PropsType'

import { roomsService } from '@/services'
import { IRoom } from '@/models/types'
import { CapacityOrder, MemberFilter, MtimeOrder, ScreenFilter } from '@/models/enums'
import Layout from '@/components/Layout'
import PullToRefresh from '@/components/PullToRefresh'
import SearchBar from '@/components/SearchBar'
import RoomCard from './RoomCard'
import FiltrateBar from '../../components/FiltrateBar'
import { filterSameKey } from '@/libs/utils'

const menus: DropdownMenuItemProps[] = [
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
  const [order, setOrder] = useState<MtimeOrder | CapacityOrder>(MtimeOrder.desc)
  const [searchVal, setSearchVal] = useState('')
  const [filterVal, setFilterVal] = useState<Record<string, string | number>>({})

  const { run: loadRooms } = useRequest(roomsService.list, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        setFinished(data.data.rows.length < limit.current)
        setRooms(val => [...val, ...filterSameKey(data.data.rows, val, '_id')])
      }
    }
  })

  const loadMoreRooms = async () => {
    try {
      await loadRooms({
        hasScreen: getHasScreen(filterVal.hasScreen as ScreenFilter),
        name: searchVal || undefined,
        capacity: filterVal.capacity as MemberFilter,
        offset: rooms.length,
        limit: limit.current,
        order: [order] as MtimeOrder[] | CapacityOrder[]
      })
    } catch (error) {
      console.trace(error)
    }
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
          placeholder='请输入会议室名称'
          value={searchVal}
          onSearch={val => {
            refresh(() => setSearchVal(val))
          }}
          onClear={val => {
            refresh(() => setSearchVal(val))
          }}
        />
        <FiltrateBar
          menus={menus}
          value={filterVal}
          onChange={(v) => {
            refresh(() => {
              if (v && v.capacity) setOrder(CapacityOrder.desc)
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
