import React, { useState } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';

export const AuthContext = React.createContext();

function AuthProvider({ children }){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const _validateToken = (token) => {
    try {
      // if token is valid, then we HAVE a user assigned to the validUser variable
      let validUser = jwt_decode(token);
      console.log('validUser', validUser);
      if (validUser){
        setUser(validUser);
        setIsLoggedIn(true);
        console.log('I am logged in');
      }
    } catch(err){
      setError(err);
      console.log(err);
    }
  }
  
  const login = async (username, password) => {
    //DONE: not use user.json, but signin to our backend
    let config = {
      baseURL: 'https://api-js401.herokuapp.com',
      url: '/signin',
      method: 'post',
      auth: { username, password },
    }
    let response = await axios(config);
    console.log('user---------', response.data);
    let token = response.data.token
    if (token){
      try {
        _validateToken(token)
      } catch(err){
        setError(err);
        console.log(err);
      }
    }
  }
  
  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
  }

  const can = (capability) => {
    return user?.capabilities?.includes(capability)
  }

  const values = {
    isLoggedIn,
    user,
    error,
    login,
    logout,
    can,
  }
  return(
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
