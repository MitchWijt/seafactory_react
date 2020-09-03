import React, {useEffect} from 'react';
import Home from './screens/home'
import Register from './screens/register';
import PaymentComplete from './screens/register/steps/PaymentComplete';
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


const checkLoginStatus = async (login, logout) => {
  let res = await axios.get('/auth/user');

  if(res.data.isLoggedIn === true){
    login(res.data.user, res.data.user.role);
  } else {
    logout();
    const setToken = async () => {
      await axios.get('/token');
    }
    setToken();
  }
}

function App(props) {
  useEffect(() => {
    const loginStatus = async () => {
      await checkLoginStatus(props.login, props.logout);
    }
    loginStatus();
    
  }, []);

  return (
    <Router>
      <Switch>
        <Route path='/thank-you' component={PaymentComplete}/>
        <Route path='/register' component={Register}/>
        <Route path='/' component={Home}/>
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
