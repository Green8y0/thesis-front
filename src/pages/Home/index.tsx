import { Switch, Route } from 'react-router-dom'

import Rooms from '../Rooms'
import Me from '../Me'
import Meetings from '../Meetings'
import Detail from '../Detail'
import styles from './style.module.less'

export default function Home() {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        {/* <MenuOutlined onClick={() => setVisible(true)} /> */}
      </header>
      <main className={styles.body}>
        <Switch>
          <Route path='/me' exact component={Me} />
          <Route path='/meetings' exact component={Meetings} />
          <Route path='/detail/:id' component={Detail} />
          <Route path='/' exact component={Rooms} />
        </Switch>
      </main>
    </div>
  )
}
