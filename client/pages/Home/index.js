import React, { useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  useEffect(() => {
    axios.get('/api/users')
      .then(res => console.log(res.data)) 
  }, [])

  return(
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

export default Home;