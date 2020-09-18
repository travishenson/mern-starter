import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';

// Context, dispatch, and user actions for handling auth
import {useUserState, useUserDispatch} from '../../context/user';
import {userActions} from '../../actions/user.actions';

const Login = () => {
  const { isAuth } = useUserState();
  const dispatch = useUserDispatch();
  const history = useHistory();

  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setForm(prevState => ({...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginResponse = await userActions.login(form.username, form.password);

    // Set user context if login is successful
    if (loginResponse.status === 200) {
      dispatch({ type: 'LOGIN',
        payload: {
          isAuth: true,
          username: loginResponse.data.username
        }
      })

      history.push('/profile');
    }
  }

  if (isAuth) return(<Redirect to={{pathname: '/profile'}} />)

  return(
    <div>
      <h1>Login Page</h1>
      <form>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            value={form.username}
            onChange={handleChange}
            placeholder='Enter username.'
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={form.password}
            onChange={handleChange}
            placeholder='Enter password.'
          />
        </div>
        <button 
          type='submit' 
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login;