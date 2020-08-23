import React from 'react';
import Home from './screens/home'
import Register from './screens/register';
import './config/style.css';
import './config/errors.css';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/register' component={Register}/>
        <Route path='/' component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
