import React from 'react';
import { useUserState } from '../../context/user';

const Home = () => {
  const { username } = useUserState();

  return(
    <div>
      <h1>Home Page</h1>
      <h2>{username}, this is your home page.</h2>
    </div>
  )
}

export default Home;