import React, { useState } from 'react';

// create context
export const SettingsContext = React.createContext();

// create a provider
function SettingsProvider({ children }){
  // we will use the setters tomorrow!
  const [title, setTitle] = useState('Some Site');
  const [email, setEmail] = useState('ryan@codefellows.com');
  const [staff, setStaff] = useState([
    {name: 'Ryan', position: ' Lead Instructor'},
  ])

  // we can "do the thing here" to make calculations etc
  // useReducer to manage state 
  const addStaff = (newMember) => {
    setStaff([...staff, newMember]);
  }

  // context is THIS object
  const values = {
    title,
    email,
    staff,
    setTitle,
    setEmail,
    addStaff,
  }

  return(
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;
