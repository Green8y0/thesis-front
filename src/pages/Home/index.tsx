import { Switch, Route } from 'react-router-dom'

import Rooms from '../Rooms'
import Me from '../Me'
import styles from './style.module.less'

export default function Home() {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        {/* <MenuOutlined onClick={() => setVisible(true)} /> */}
      </header>
      <main className={styles.body}>
        <Switch>
          <Route path="/me" exact component={Me} />
          <Route path="/" exact component={Rooms} />
        </Switch>
      </main>
    </div>
  )
}
