


// src/hooks/useTodoValidation.js
import { useState } from 'react';

const useTodoValidation = (todos) => {
  const [errorMessage, setErrorMessage] = useState('');

  const validateTodo = (text) => {
    if (text.trim() === '') {
      setErrorMessage('Please fill the todo');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return false;
    }

    const isDuplicate = todos.some(
      (todo) => todo.text.trim().toLowerCase() === text.trim().toLowerCase()
    );

    if (isDuplicate) {
      setErrorMessage('The task already exists');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return false;
    }

    return true;
  };

  return { errorMessage, validateTodo };
};

export default useTodoValidation; 
