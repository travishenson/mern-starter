import React, { useEffect } from 'react';
import { useUserState } from '../../context/user';

const Profile = () => {
  const { username } = useUserState();
  
  return (
    <div>
      <h1>Profile</h1>
      <h2>Welcome back, {username}!</h2>
    </div>
  );
};

export default Profile;