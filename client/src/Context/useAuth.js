import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    navigate('/todos');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// // useAuth.js

// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Create the AuthContext
// const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);

// // AuthProvider component
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Function to handle login
//   const login = (token) => {
//     localStorage.setItem('token', token);
//     setIsLoggedIn(true);
//   };

//   // Function to handle logout
//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
