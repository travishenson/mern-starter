import React, { useState } from 'react';
import axios from 'axios';

import { useAuthDispatch } from '../../context/Auth/index';
import { history } from '../../utils/history';

import {CountProvider, useUserState, useUserDispatch} from '../../context/user';

const Login = () => {
  const { current_user } = useUserState();
  const dispatch = useUserDispatch();

  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setForm(prevState => ({...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.username && form.password) {
      axios.post('/api/auth/login', {
        username: form.username,
        password: form.password
      }).then(response => {
        if (response.status === 200) {
          let resData = response.data;

          dispatch({ type: 'LOGIN',
            payload: {
              isAuth: true,
              username: resData.username
            }
          })

          history.push('/profile');
          history.go();
        }
      })
    }
  }

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