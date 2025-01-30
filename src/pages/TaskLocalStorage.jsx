import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import TodoInput from "../components/common/TodoInput";
import TodoList from "../components/common/TodoList";
import ConfirmDeleteModal from "../components/common/ConfirmDeleteModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/TaskLocalStorage.css";

export default function TaskLocalStorage() {
  const { todos, addTodo, removeTodo, errorMessage } = useLocalStorage(
    "todos",
    []
  ); // Use addTodo from the hook

  return (
    <div className="task-container">
      <h1>Task LocalStorage</h1>

      <TodoInput onAdd={addTodo} errorMessage={errorMessage} />

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <TodoList deleteTodo={removeTodo} todos={todos} />

      <ConfirmDeleteModal />
    </div>
  );
}
