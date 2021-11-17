import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useRequest } from 'ahooks'

import Layout from '@/components/Layout'
import UserCard from './UserCard'
import { userService } from '@/services'
import { IUser } from '@models/types'
import styles from './style.module.less'

export default function Me() {
  const history = useHistory()
  const [user, setUser] = useState<IUser>()
  useRequest(userService.info, {
    onSuccess: data => {
      if (data.stat !== 'OK') {
        history.replace('/login')
      } else if (data.stat === 'OK') {
        setUser(data.data)
      }
    }
  })
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
    </Layout>
  )
}
