import Meteor from "meteor/meteor";
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Bases
import Init from './Init.jsx'
import App from './App.jsx'

// Pages
import Login from '../../Accounts/Login.jsx'
import Signup from '../../Accounts/Signup.jsx'

export const renderRoutes = () => (
  <Router>
    <div id="Routes">
      <Route exact={true} path="/" component={Init}/>
      
      <Route path="/App" component={App}/>

      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
    </div>
  </Router>
);