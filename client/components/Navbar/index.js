import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import {useUserState, useUserDispatch} from '../../context/user';

const Navbar = () => {
  const { isAuth } = useUserState();
  const dispatch = useUserDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
  }

  if (isAuth) {
    return(
      <nav>
        <NavLink exact to='/'>Home</NavLink>
        <NavLink exact to='/about'>About</NavLink>
        <NavLink exact to='/profile'>Profile</NavLink>
        <span onClick={logout}>Log out</span>
      </nav>
    )
  } else {
    return(
      <nav>
        <NavLink exact to='/'>Home</NavLink>
        <NavLink exact to='/about'>About</NavLink>
        <NavLink exact to='/register'>Register</NavLink>
        <NavLink exact to='/login'>Login</NavLink>
      </nav>
    )
  }
}

export default Navbar;