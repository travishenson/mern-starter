import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Import global components
import { Navbar } from './components';

// Pages and custom history for routing
import { Home, About, Login, Profile } from './pages';
import { history } from './utils/history';

// Global context for storing authenticated user
import {AuthProvider} from './context/Auth/index';
import {UserProvider, useCountState, useCountDispatch} from './context/user';

const App = () => {
  return(
    <Router className='app' history={history}>
      <UserProvider>
        <Navbar />
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute 
              exact 
              path='/profile' 
              user={window.localStorage.getItem('current_user')} 
              component={Profile} 
            />
          </Switch>
        </main>
      </UserProvider>
    </Router>
  )
};

// Creating a PrivateRoute 
const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (user !== null) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={{pathname: '/login'}} />
        }
      }
    } />
  )
}

ReactDOM.render(<App />, document.getElementById('root'));