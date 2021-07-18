import React, { useEffect } from 'react'
import Home from './screens/home'
import Register from './screens/register'
import Dashboard from './screens/dashboard'
import GuestList from './screens/guestList'
import EditRental from './screens/editRental'
import Login from './screens/login/Login'
import Guest from './screens/guest'
import Calendar from './screens/calendar'
import SubscriptionExpired from './screens/subscriptionExpired'
import './config/style/style.css'
import './config/style/flexbox.css'
import './config/style/errors.css'
import './config/style/dataTable.css'
import './config/style/modal.css'
import 'antd/dist/antd.css'
import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout } from './redux/actions/userStateActions'
import { ProtectedRoute } from './config/protectedRoute'
import { useJwt } from 'react-jwt'

function App (props) {
  const { isExpired } = useJwt(localStorage.apiToken)
  const history = useHistory()

  useEffect(() => {
    if (isExpired) {
      localStorage.removeItem('apiHost')
      history.push('/')
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path='/calendar/:year/:month/:day/:calendarItemId?' component={Calendar} userState={props.userState} />
        <ProtectedRoute exact path='/rental/:id' component={EditRental} userState={props.userState} />
        <ProtectedRoute exact path='/guest/:id' component={Guest} userState={props.userState} />
        <ProtectedRoute exact path='/guestlist' component={GuestList} userState={props.userState} />
        <ProtectedRoute exact path='/dashboard' component={Dashboard} userState={props.userState} />
        <Route exact path='/expired' component={SubscriptionExpired} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/' component={Home} />
        <Route component={Home} />
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    userState: { ...state.userStateReducer }
  }
}

const mapDispatchToProps = { login, logout }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
