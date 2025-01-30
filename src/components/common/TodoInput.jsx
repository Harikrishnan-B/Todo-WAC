

import React, { useState } from 'react';


export default function TodoInput({ onAdd, errorMessage }) {
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    onAdd(newTodo); // Call the passed add function
    setNewTodo(''); // Clear the input field
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new task"
        className={errorMessage ? 'error-input' : ''}
      />
      {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
      <button onClick={handleAddTodo}>Add Task</button>
    </div>
  );
}
