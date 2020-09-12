import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return(
    <nav>
      <NavLink exact to='/'>Home</NavLink>
      <NavLink exact to='/about'>About</NavLink>
      <NavLink exact to='/login'>Login</NavLink>
    </nav>
  )
}

export default Navbar;