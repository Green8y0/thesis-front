import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from '../Home'
import Login from '../Login'
import Register from '../Register'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </BrowserRouter>
  )
}
