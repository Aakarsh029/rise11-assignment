import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Context/useAuth';
import Login from './components/Login';
import Signup from './components/Signup';
import TodoList from './components/TodoList';

// PrivateRoute component to protect routes
const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Element {...rest} /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/todos" element={<TodoList />} /> */}
          <Route path="/todos" element={<PrivateRoute element={TodoList} />} />
          <Route path="/" element={<Navigate to="/signup" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
