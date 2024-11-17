import React, { createContext, useContext, useState } from 'react';

// Create a context with default value as false (not logged in)
const LoggedInContext = createContext(false);

// Create a provider component
export const LoggedInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
};

// Custom hook to use the LoggedInContext
export const useLoggedInStatus = () => {
  return useContext(LoggedInContext);
};