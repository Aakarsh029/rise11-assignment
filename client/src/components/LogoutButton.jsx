// LogoutButton.js

import React from 'react';
import { useAuth } from '../Context/useAuth';
import { useNavigate } from 'react-router-dom';
import "./css/LogoutButton.css"
const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button className='LogoutButton' onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
