import { Switch, Route } from 'react-router-dom'

import Rooms from '../Rooms'
import Me from '../Me'
import WorkStation from '../WorkStation'
import Detail from '../Detail'
import RoomUpdate from '../EditRoom/Update'
import Reserve from '../Reserve'
import Roles from '@/pages/Roles'
import AddRoom from '../EditRoom/AddRoom'
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
          <Route path='/work' exact component={WorkStation} />
          <Route path='/roles' exact component={Roles} />
          <Route path='/room/add' exact component={AddRoom} />
          <Route path='/reserve' exact component={Reserve} />
          <Route path='/detail/:id' component={Detail} />
          <Route path='/room/update/:id' component={RoomUpdate} />
          <Route path='/' exact component={Rooms} />
        </Switch>
      </main>
    </div>
  )
}
