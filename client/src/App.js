import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Footer from './components/layout/Footer'
import Dashboard from './components/dashboard/Dashboard'

import PrivateRoute from './components/common/PrivateRoute'
import CreateProfile from './components/createProfile/CreateProfile';



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={Landing} />
          <div className="container">
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/create-profile' component={CreateProfile} />
            </Switch>
          </div>

          <Footer />
        </div>
      </ Router >
    );
  }
}


export default App;
