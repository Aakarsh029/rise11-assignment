import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogoutButton from './LogoutButton';
import './css/TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState({ id: null, text: '' });

  useEffect(() => { 
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token');
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
      const response = await axios.post(
        'http://localhost:5000/api/todos',
        { text: newTodo }, 
        { headers: { 'x-auth-token': token } }
      );
      setTodos([...todos, response.data]);
      setNewTodo('');
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
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Failed to delete todo', error);
    }
  };

  const updateTodo = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/todos/${editTodo.id}`,
        { text: editTodo.text },
        { headers: { 'x-auth-token': token } }
      );
      // Update the todos state with the updated todo
      setTodos(todos.map(todo => (todo._id === editTodo.id ? { ...todo, text: editTodo.text } : todo)));
      setEditTodo({ id: null, text: '' });
    } catch (error) {
      console.error('Failed to update todo', error);
    }
  };

  const handleEditChange = (e) => {
    setEditTodo({
      id: editTodo.id,
      text: e.target.value
    });
  };

  const setEdit = (id, text) => {
    setEditTodo({
      id,
      text
    });
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
            {editTodo.id === todo._id ? (
              <>
                <input
                  type="text"
                  value={editTodo.text}
                  onChange={handleEditChange}
                />
                <button className='edit-button' onClick={updateTodo}>Update</button>
              </>
            ) : (
              <>
                {todo.text}
                <button className='edit-button' onClick={() => setEdit(todo._id, todo.text)}>Edit</button>
                <button onClick={() => deleteTodo(todo._id)} className="delete-button">Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import LogoutButton from './LogoutButton';
// import './css/TodoList.css';

// const TodoList = () => {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState('');

//   useEffect(() => { 
//     const fetchTodos = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         console.log(token);
//         const response = await axios.get('http://localhost:5000/api/todos', {
//           headers: { 'x-auth-token': token },
//         });
//         setTodos(response.data);
//       } catch (error) {
//         console.error('Failed to fetch todos', error);
//       }
//     };

//     fetchTodos();
//   }, []);

//   const addTodo = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       // console.log(token)
//       console.log(newTodo);
//       const response = await axios.post(
//         'http://localhost:5000/api/todos',
//         { text: newTodo }, 
//         { headers: { 'x-auth-token': token } }
//       );
//       console.log(newTodo);
//       setTodos([...todos, response.data]); // Update todos state with the new todo
//       setNewTodo(''); // Clear the input field after adding todo
//     } catch (error) {
//       console.error('Failed to add todo', error);
//     }
//   };

//   const deleteTodo = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:5000/api/todos/${id}`, {
//         headers: { 'x-auth-token': token },
//       });
//       setTodos(todos.filter(todo => todo._id !== id)); // Remove deleted todo from todos state
//     } catch (error) {
//       console.error('Failed to delete todo', error);
//     }
//   };

//   return (
//     <div className="todo-container">
//       <h2>Todo List</h2>
//       <LogoutButton />
//       <div className="todo-input-container">
//         <input
//           type="text"
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//           placeholder="New Todo"
//           className="todo-input"
//         />
//         <button onClick={addTodo} className="todo-button">Add Todo</button>
//       </div>
//       <ul className="todo-list">
//         {todos.map(todo => (
//           <li key={todo._id} className="todo-item">
//             {todo.text}
//             <button onClick={() => deleteTodo(todo._id)} className="delete-button">Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoList;
