import React, { useState } from 'react';
import { useAuth } from '../Context/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Signup.css';  // Import the CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { username, password });
      login(response.data.token);
      navigate('/todos');
    } catch (error) {
      console.error('Signup failed', error.response?.data || error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup Page</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="signup-input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="signup-input"
      />
      <button onClick={handleSignup} className="signup-button">Signup</button>
    </div>
  );
};

export default Signup;


// import React, { useState } from 'react';
// import { useAuth } from '../Context/useAuth';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/signup', { username, password });
//       login(response.data.token);
//       navigate('/todos');
//     } catch (error) {
//       console.error('Signup failed', error.response?.data || error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Signup Page</h2>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button onClick={handleSignup}>Signup</button>
//     </div>
//   );
// };

// export default Signup;
