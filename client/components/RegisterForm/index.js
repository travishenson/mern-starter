import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';

import {userActions} from '../../actions/user.actions';
import {useUserDispatch} from '../../context/user';
import './style.css';

const RegisterForm = () => {
  const dispatch = useUserDispatch();
  const history = useHistory();

  // Scheme for Yup form validation
  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters.')
      .required('Username is required.'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters.')
      .required('Password is required.'),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'Passwords must match.')
  });

  // On form submit, attempt to register user. If successful, login and redirect to profile.
  const handleSubmit = async (values) => {
    const registerResponse = await userActions.register(values.username, values.password);

    if (registerResponse.status === 200) {
      dispatch({ type: 'LOGIN',
        payload: {
          isAuth: true,
          username: registerResponse.data.username
        }
      })

      history.push('/profile');
    }
  }

  return(
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values)
      }}
    >
      <Form>
        <div>
          <label htmlFor='username'>Username</label>
          <Field 
            id='username'
            name='username'
            placeholder='Username'
          />
          <ErrorMessage name='username' component='div' className='error-message'/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <Field
            id='password'
            name='password'
            placeholder='Password'
            type='password'
          />
          <ErrorMessage name='password' component='div' className='error-message'/>
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <Field
            id='confirmPassword'
            name='confirmPassword'
            placeholder='Confirm Password'
            type='password'
          />
          <ErrorMessage name='confirmPassword' component='div' className='error-message'/>
        </div>
        <div>
          <button type='submit'>Register</button>
        </div>
      </Form>
    </Formik>
  )
}

export default RegisterForm;