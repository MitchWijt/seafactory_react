import React, {useEffect} from 'react';
import Home from './screens/home'
import Register from './screens/register';
import PaymentComplete from './screens/register/steps/PaymentComplete';
import Dashboard from './screens/dashboard';
import Login from './screens/login';
import './config/style.css';
import './config/errors.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux';
import {login, logout} from './redux/actions/userStateActions';
import {ProtectedRoute} from './config/protectedRoute';


const checkLoginStatus = async (login, logout, userState) => {
  let res = await axios.get('/auth/user');

  if(res.data.isLoggedIn === true){
    login(res.data.user, res.data.role);
  } else {
    logout();
    await axios.get('/token');
  }
}

function App(props) {
  useEffect(() => {
    const loginStatus = async () => {
      await checkLoginStatus(props.login, props.logout, props.userState);
    }
    loginStatus();
    
  }, []);

  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path='/dashboard' component={Dashboard} userState={props.userState}/>
        <ProtectedRoute exact path='/thank-you' component={PaymentComplete} userState={props.userState}/>
        <Route exact path='/login/:type' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/' component={Home}/>
      </Switch>
    </Router>
  );
  
}

const mapStateToProps = (state) => {
  return {
    userState : {...state.userStateReducer}
  }
}

const mapDispatchToProps = {login, logout};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
