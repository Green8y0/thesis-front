import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Tabbar } from 'react-vant'
// import { WritingType } from '@/models/enums'
import styles from './style.module.less'

export default function PackTabBar() {
  const history = useHistory()
  const [activeKey, setActiveKey] = useState('home')
  const tabs = [
    {
      key: 'home',
      title: '主页',
      icon: 'wap-home-o'
    },
    {
      key: 'new',
      title: '会议',
      icon: 'todo-list-o'
    },
    {
      key: 'me',
      title: '我的',
      icon: 'user-o'
    }
  ]

  const onChange = (key: string) => {
    if (key === 'home') {
      setActiveKey('home')
      history.push('/')
    }
    if (key === 'me') {
      setActiveKey('me')
      history.push('/me')
    }
    if (key === 'new') {
      setActiveKey('new')
      history.push('/new')
    }
  }

  useEffect(() => {
    if (window.location.pathname.includes('me')) setActiveKey('me')
    else if (window.location.pathname.includes('new')) setActiveKey('new')
    else setActiveKey('home')
  }, [])

  return (
    <Tabbar
      activeColor="#1890ff"
      value={activeKey}
      onChange={(v) => onChange(v as string)}
      className={styles.tabbar}
    >
      {tabs.map(item => (
        <Tabbar.Item
          key={item.key}
          icon={item.icon}
          name={item.key}
        >{item.title}</Tabbar.Item>
      ))}
    </Tabbar>
  )
}
