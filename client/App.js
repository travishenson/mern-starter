import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'normalize.css';

// Import global components
import { Navbar } from './components';

// Global app styles
import './App.css';

// Pages and custom history for routing
import { Home, About, Register, Login, Profile } from './pages';
import { history } from './utils/history';

// Global context for storing authenticated user
import {UserProvider} from './context/user';

const App = () => {
  return(
    <Router className='app' history={history}>
      <UserProvider>
        <Navbar />
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/profile' component={Profile} />
          </Switch>
        </main>
      </UserProvider>
    </Router>
  )
};

// Creating a PrivateRoute 
const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = JSON.parse(window.localStorage.getItem('current_user'));
  const isAuth = currentUser !== null ? currentUser.isAuth : false;

  return (
    <Route {...rest} render={(props) => (
      isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect to={{pathname: '/login'}} />
      ))
    } />
  )
}

ReactDOM.render(<App />, document.getElementById('root'));