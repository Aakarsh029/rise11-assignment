import React, { useState } from 'react';
import { useAuth } from '../Context/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';  
import { Link } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(''); 
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      login(response.data.token);
      navigate('/todos');
    } catch (error) {
      console.error('Login failed', error.response?.data || error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="login-input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">Login</button>
      <div className="bottom">If You Don't Have an Account! Please <Link to="/signup">SIGN-UP</Link> </div>
    </div>
  );
};

export default Login;

