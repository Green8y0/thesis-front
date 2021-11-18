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
      icon: 'plus'
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
    <Tabbar
      value={activeKey}
      onChange={() => onChange(activeKey)}
      className={styles.tabbar}
    >
      {tabs.map(item => (
        <Tabbar.Item
          key={item.key}
          icon={item.icon}
        >{item.title}</Tabbar.Item>
      ))}
    </Tabbar>
  )
}
