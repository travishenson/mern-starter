import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'normalize.css';

// Import global components
import { Navbar, Page } from './components';

// Global app styles
import './App.css';

// Pages and custom history for routing
import { Home, About, Register, Login, Profile } from './pages';

// Global context for storing authenticated user
import {UserProvider} from './context/user';

// Set app name for page titles
const app_name = 'MERN Starter';

const App = () => {
  return(
    <Router className='app'>
      <UserProvider>
        <Navbar />
        <main>
          <Switch>
            <CustomRoute exact path='/' title={app_name} component={Home} />
            <CustomRoute exact path='/about' title={`About | ${app_name}`} component={About} />
            <CustomRoute exact path='/register' title={`Register | ${app_name}`} component={Register} />
            <CustomRoute exact path='/login' title={`Login | ${app_name}`} component={Login} />
            <PrivateRoute exact path='/profile' title={`Profile | ${app_name}`} component={Profile} />
          </Switch>
        </main>
      </UserProvider>
    </Router>
  )
};

// Creating a CustomRoute
const CustomRoute = ({ component: Component, title: Title, ...rest }) => {
  return(
    <Route {...rest} render={(props) => (
      <Page title={Title}>
        <Component {...props} />
      </Page>
    )} />
  )
}

// Creating a PrivateRoute 
const PrivateRoute = ({ component: Component, title: Title, ...rest }) => {
  const currentUser = JSON.parse(window.localStorage.getItem('current_user'));
  const isAuth = currentUser !== null ? currentUser.isAuth : false;

  return (
    <Route {...rest} render={(props) => (
      isAuth ? (
        <Page title={Title}>
          <Component {...props} />
        </Page>
      ) : (
        <Redirect to={{pathname: '/login'}} />
      ))
    } />
  )
}

ReactDOM.render(<App />, document.getElementById('root'));