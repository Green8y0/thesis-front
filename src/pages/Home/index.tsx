import { Switch, Route } from 'react-router-dom'

import styles from './style.module.less'
import Setting from '../Setting'
import Rooms from '../Rooms'
import Me from '../Me'

export default function Home() {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        {/* <MenuOutlined onClick={() => setVisible(true)} /> */}
      </header>
      <main className={styles.body}>
        <Switch>
          <Route path="/setting" exact component={Setting} />
          <Route path="/me" exact component={Me} />
          <Route path="/" exact component={Rooms} />
        </Switch>
      </main>
    </div>
  )
}
