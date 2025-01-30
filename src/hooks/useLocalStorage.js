import { useState, useEffect } from 'react';
import useTodoValidation from './useTodoValidation'; // Import the validation hook

function useLocalStorage(key = "todos", initialValue) {
  
  const getStoredValue = () => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  };

  const [todos, setTodos] = useState(getStoredValue);
  const { errorMessage, validateTodo } = useTodoValidation(todos); // Use validation hook

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(todos));
  }, [todos, key]);

  
  const addTodo = (newTodoText) => {
    if (validateTodo(newTodoText)) { // Only proceed if validation passes
      const newTodo = { id: Date.now(), text: newTodoText.trim() }; // Ensure each todo has a unique id
      setTodos((prevTodos) => [...prevTodos, newTodo]); // Update the state
    }
  };

  // Remove a todo by its id
  const removeTodo = (id) => {
    
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return { todos, addTodo, removeTodo, errorMessage }; // Return addTodo and errorMessage
}

export default useLocalStorage;
