import axios from 'axios';

// Basic user functions to handle auth actions
export const userActions = {
  login,
  logout,
  register
};

async function login(username, password) {
  const response = await axios.post('/api/auth/login', {
    username, 
    password
  });

  return response;
};

function logout() {

};

async function register(username, password) {
  const registerResponse = await axios.post('/api/auth/register', {
    username,
    password
  });

  // If registration is successful, execute login action
  if (registerResponse.status === 200) {
    const loginResponse = await login(username, password);

    return loginResponse;
  } else {
    return registerResponse;
  }
};