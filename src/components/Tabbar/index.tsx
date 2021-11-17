import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import {
  HomeOutlined,
  PlusOutlined,
  UserOutlined
} from '@ant-design/icons'
// import { WritingType } from '@/models/enums'
import styles from './style.module.less'

export default function PackTabBar() {
  const history = useHistory()
  const [activeKey, setActiveKey] = useState('home')
  const tabs = [
    {
      key: 'home',
      title: '主页',
      icon: <HomeOutlined className={styles['tabbar-icon']} />
    },
    {
      key: 'new',
      icon: <PlusOutlined className={styles.icon} />
    },
    {
      key: 'me',
      title: '我的',
      icon: <UserOutlined className={styles['tabbar-icon']} />
    }
  ]

  const onChange = (key: string) => {
    if (key === 'home') {
      setActiveKey('home')
      history.push({
        pathname: '/',
        state: { site: 'wps' }
      })
    }
    if (key === 'me') {
      setActiveKey('me')
      history.push('/me')
    }
    if (key === 'writing') {
      setActiveKey('writing')
      history.push({
        pathname: '/writing',
        state: { type: 'ask' }
      })
    }
  }

  useEffect(() => {
    if (window.location.pathname.includes('me')) setActiveKey('me')
    else if (window.location.pathname.includes('writing')) setActiveKey('writing')
    else setActiveKey('home')
  }, [])

  return (
    <TabBar activeKey={activeKey} onChange={onChange}
      className={styles.tabbar}
    >
      {tabs.map(item => (
        <TabBar.Item
          key={item.key}
          icon={item.icon}
          title={item.title}
        />
      ))}
    </TabBar>
  )
}
