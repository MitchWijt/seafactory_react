import React, { useEffect } from 'react'
import Home from './screens/home'
import Register from './screens/register'
import PaymentComplete from './screens/register/steps/PaymentComplete'
import Dashboard from './screens/dashboard'
import GuestList from './screens/guestList'
import EditRental from './screens/editRental'
import Login from './screens/login'
import Guest from './screens/guest'
import Calendar from './screens/calendar'
import SubscriptionExpired from './screens/subscriptionExpired'
import './config/style/style.css'
import './config/style/flexbox.css'
import './config/style/errors.css'
import './config/style/dataTable.css'
import './config/style/modal.css'
import 'antd/dist/antd.css'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout } from './redux/actions/userStateActions'
import { ProtectedRoute } from './config/protectedRoute'

const checkLoginStatus = async (login, logout) => {
  const res = await axios.get('/auth/user')

  if (res.data.isLoggedIn === true) {
    login(res.data)
  } else {
    logout()
    await axios.get('/token')
  }
}

function App (props) {
  useEffect(() => {
    const loginStatus = async () => {
      await checkLoginStatus(props.login, props.logout, props.userState)
    }
    loginStatus()
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
        <ProtectedRoute exact path='/thank-you' component={PaymentComplete} userState={props.userState} />
        <Route exact path='/expired' component={SubscriptionExpired} />
        <Route exact path='/login/:type' component={Login} />
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
