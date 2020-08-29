import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return(
    <nav>
      <NavLink exact to='/'>Home</NavLink>
      <NavLink exact to='/about'>About</NavLink>
    </nav>
  )
}

export default Navbar;