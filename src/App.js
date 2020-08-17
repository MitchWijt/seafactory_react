import React from 'react';
import Home from './screens/home'
import './config/style.css';
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
        <Route path='/' component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
