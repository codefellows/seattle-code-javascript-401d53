import React, { useState } from 'react';

// create context---------
export const SettingsContext = React.createContext()

// create provider
function SettingsProvider({ children }){
  const [displayCount, setDisplayCount] = useState(3);
  const [showComplete, setShowComplete] = useState(false);
  const [sort, setSort] = useState('difficulty');

  // this will be the SettingsContext STATE
  const values = {
    displayCount,
    showComplete,
    sort,
  }

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;
