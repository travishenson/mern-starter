import React from 'react';
import { Redirect } from 'react-router-dom';

import {useUserState} from '../../context/user';
import { RegisterForm } from '../../components';

const Register = () => {
  const { isAuth } = useUserState();

  if (isAuth) return(<Redirect to={{pathname: '/profile'}} />)

  return(
    <div>
      <h1>Register Page</h1>
      <RegisterForm />
    </div>
  )
}

export default Register;