import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogoutButton from './LogoutButton';
import './css/TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => { 
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await axios.get('http://localhost:5000/api/todos', {
          headers: { 'x-auth-token': token },
        });
        setTodos(response.data);
      } catch (error) {
        console.error('Failed to fetch todos', error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    try {
      const token = localStorage.getItem('token');
      // console.log(token)
      console.log(newTodo);
      const response = await axios.post(
        'http://localhost:5000/api/todos',
        { text: newTodo }, 
        { headers: { 'x-auth-token': token } }
      );
      console.log(newTodo);
      setTodos([...todos, response.data]); // Update todos state with the new todo
      setNewTodo(''); // Clear the input field after adding todo
    } catch (error) {
      console.error('Failed to add todo', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setTodos(todos.filter(todo => todo._id !== id)); // Remove deleted todo from todos state
    } catch (error) {
      console.error('Failed to delete todo', error);
    }
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <LogoutButton />
      <div className="todo-input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Todo"
          className="todo-input"
        />
        <button onClick={addTodo} className="todo-button">Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className="todo-item">
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
