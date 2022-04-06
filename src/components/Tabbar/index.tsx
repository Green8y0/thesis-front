import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Tabbar } from 'react-vant'
import styles from './style.module.less'

export default function PackTabBar() {
  const history = useHistory()
  const location = useLocation()
  const [activeKey, setActiveKey] = useState('home')
  const tabs = [
    {
      key: 'home',
      title: '主页',
      icon: 'wap-home-o'
    },
    {
      key: 'work',
      title: '工作台',
      icon: 'apps-o'
    },
    {
      key: 'me',
      title: '我的',
      icon: 'user-o'
    }
  ]

  const onChange = (key: string) => {
    setActiveKey(key)
    if (key === 'home') {
      history.push('/')
    }
    if (key === 'me') {
      history.push('/me')
    }
    if (key === 'work') {
      history.push('/work')
    }
  }

  useEffect(() => {
    if (location.pathname === '/me') setActiveKey('me')
    else if (location.pathname === '/work') setActiveKey('work')
    else setActiveKey('home')
  }, [location.pathname])

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
