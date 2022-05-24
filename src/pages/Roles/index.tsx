import { useRequest } from 'ahooks'
import { useRef, useState } from 'react'
import { Sticky } from 'react-vant'
import { ListInstance } from 'react-vant/es/list'

import Layout from '@/components/Layout'
import { userService } from '@/services'
import { IUser } from '@/models/types'
import { filterSameKey } from '@/libs/utils'
import SearchBar from '@/components/SearchBar'
import PullToRefresh from '@/components/PullToRefresh'
import UserList from './UserList'

export default function Roles() {
  const limit = useRef(10)
  const [users, setUsers] = useState<IUser[]>([])
  const [finished, setFinished] = useState(false)
  const listRef = useRef<ListInstance>(null)
  const [searchVal, setSearchVal] = useState('')

  const { run: getUsers } = useRequest(userService.list, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        setUsers(val => [...val, ...filterSameKey(data.data.rows, val, '_id')])
        setFinished(data.data.rows.length < limit.current)
      }
    }
  })

  const loadMoreUser = async () => {
    try {
      if (searchVal) {
        await getUsers({ phoneNums: [searchVal] })
      } else {
        await getUsers({
          offset: users.length,
          limit: limit.current
        })
      }
    } catch (error) {
      console.trace(error)
    }
  }

  const refresh = async (fn?: () => void) => {
    return new Promise(resolve => {
      setFinished(false)
      setUsers([])
      fn && fn()
      resolve('')
    }).then(() => {
      listRef.current?.check()
    })
  }

  return (
    <Layout
      showNav={true}
      navText='权限修改'
      showTab={false}
    >
      <Sticky>
        <SearchBar
          placeholder='请输入手机号'
          value={searchVal}
          onSearch={val => {
            refresh(() => setSearchVal(val))
          }}
          onClear={val => {
            refresh(() => setSearchVal(val))
          }}
        />
      </Sticky>
      <PullToRefresh
        onRefresh={async () => {
          refresh()
        }}
      >
        <UserList
          listProps={{
            finished: finished,
            onLoad: loadMoreUser
          }}
          users={users}
        />
      </PullToRefresh>
    </Layout>
  )
}
