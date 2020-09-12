import React, { useEffect } from 'react';

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      let current_user = {
        isAuth: action.payload.isAuth,
        username: action.payload.username
      };
      window.localStorage.setItem('current_user', JSON.stringify(current_user))
      return {
        ...state,
        isAuth: action.payload.isAuth,
        username: action.payload.username
      }
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuth: false,
        username: null
      }
    default: throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const UserProvider = ({ children }) => {
  const storedUser = window.localStorage.getItem('current_user');

  if (storedUser === null) {
    const [state, dispatch] = React.useReducer(userReducer, {});
    return (
      <UserStateContext.Provider value={state}>
        <UserDispatchContext.Provider value={dispatch}>
          {children}
        </UserDispatchContext.Provider>
      </UserStateContext.Provider>
    )
  } else {
    const [state, dispatch] = React.useReducer(userReducer, JSON.parse(storedUser));
    return (
      <UserStateContext.Provider value={state}>
        <UserDispatchContext.Provider value={dispatch}>
          {children}
        </UserDispatchContext.Provider>
      </UserStateContext.Provider>
    )
  }
}

const useUserState = () => {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider')
  };

  return context;
}

const useUserDispatch = () => {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider')
  };
  
  return context;
}

export {UserProvider, useUserState, useUserDispatch}