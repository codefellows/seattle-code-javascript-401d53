import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import cookie from 'react-cookies'

export const AuthContext = React.createContext();

function AuthProvider({ children }){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  // DONE: useEffect to load cookie
  useEffect(() => {
    let cookieToken = cookie.load('auth');
    _validateToken(cookieToken);
  }, []);

  const _validateToken = (token) => {
    try {
      // if token is valid, then we HAVE a user assigned to the validUser variable
      let validUser = jwt_decode(token);
      // console.log('validUser', validUser);
      if (validUser){
        // save cookie
        cookie.save('auth', token);
        setUser(validUser);
        setIsLoggedIn(true);
        // console.log('I am logged in');
      }
    } catch(err){
      setError(err);
      console.log(err);
    }
  }
  
  const login = async (username, password) => {
    let config = {
      baseURL: 'https://api-js401.herokuapp.com',
      url: '/signin',
      method: 'post',
      auth: {username, password}
    }
    let response = await axios(config);
    let user = response.data;
    if (user){
      try {
        _validateToken(user.token)
      } catch(err){
        setError(err);
        console.log(err);
      }
    }
  }
  
  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
    // could remove here if we like
    cookie.remove('auth');
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
