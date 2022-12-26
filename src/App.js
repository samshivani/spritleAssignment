import {Switch, Route} from 'react-router-dom'
import './App.css'
import LoginRoute from './components/Login'
import HomeRoute from './components/Home'
import GameRoute from './components/GameRoute'
import NotFound from './components/NotFound'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <Route exact path="/" component={HomeRoute} />
    <Route exact path="/game" component={GameRoute} />
    <Route component={NotFound} />
  </Switch>
)

export default App
