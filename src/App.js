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
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout } from './redux/actions/userStateActions'
import { ProtectedRoute } from './config/protectedRoute'
import { authorizeUser, getToken } from './services/api'
import OnePlans from './screens/register/steps/OnePlans'

const checkLoginStatus = async (login, logout) => {
  const data = await authorizeUser()

  if (data.isLoggedIn) return login(data)

  logout()
  getToken()
}

function App (props) {
  useEffect(() => {
    const loginStatus = async () => {
      try {
        await checkLoginStatus(props.login, props.logout, props.userState)
      } catch (err) {
        console.log(err)
      }
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
        <Route exact path='/plans' component={OnePlans} />
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
