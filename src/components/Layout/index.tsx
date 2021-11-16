import { PropsWithChildren } from 'react'

import NavBar from '../NavBar'
import Tabbar from '../Tabbar'
import styles from './style.module.less'

interface Props {
  showNav: boolean
  showTab: boolean
  activeKey?: string
  navText?: string
}

export default function Layout({
  children,
  showNav,
  showTab,
  navText
}: PropsWithChildren<Props>) {
  const hadPadding = () => {
    const noPaddingList = ['详情', '提问', '回复', '举报']
    if (navText && noPaddingList.includes(navText)) return false
    return true
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        {/* 顶部导航栏 */}
        {showNav && <NavBar title={navText} />}
      </header>
      <main className={`${styles.body} ${hadPadding() ? styles['body-padding'] : ''}`}>
        {children}
      </main>
      {/* 底部导航栏 */}
      {showTab && <Tabbar />}
    </div>
  )
}
