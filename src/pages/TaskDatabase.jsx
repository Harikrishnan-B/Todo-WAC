import React from 'react';
import useDatabase from '../hooks/useDatabase';
import TodoInput from '../components/common/TodoInput';
import TodoList from '../components/common/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TaskDatabase() {
  const { todos, handleAddTodo, deleteTodo, errorMessage, isValidating, error } = useDatabase();

  return (
    <div className="task-container">
      <h1>Task Database</h1>
      <TodoInput onAdd={handleAddTodo} />
      
      {isValidating && ( // Show spinner when fetching or revalidating data
        <div className="d-flex justify-content-center my-3">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
      {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Validation error */}
      {error && <p className="text-danger">Failed to fetch todos: {error.message}</p>} {/* SWR error */}
      
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}
