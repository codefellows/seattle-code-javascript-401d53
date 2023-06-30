import React, { useState } from 'react';

// create Context
export const ModeContext = React.createContext();

// create Provider
function ModeProvider({ children }){
  const [mode, setMode] = useState('light');

  const values = { mode };
  
  return(
    <ModeContext.Provider value={values}>
      {children}
    </ModeContext.Provider>
  )
}

export default ModeProvider;
