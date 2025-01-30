import React from "react";
import { FaTrash } from "react-icons/fa";
import { useModal } from "../../hooks/useModal";
import AlertModal from "./AlertModal";

export default function TodoList({
  todos = [],
  deleteTodo,
  columns = ["Todo"],
}) {
  const [selectedId, setSelectedId] = React.useState(null);
  const { openModal, closeModal, isOpen } = useModal();
  function handleShowModal(index) {
    setSelectedId(index);
    openModal();
    console.log(index);
  }
  function handleDelete() {
    deleteTodo(selectedId);
    closeModal();
    setSelectedId(null);
  }

  return (
    <div className="todos-list">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            {columns.map((column, index) => (
              <th key={index} scope="col">
                {column}
              </th>
            ))}
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <tr key={todo._id || index}>
                <td>{index + 1}</td>
                <td>{todo.text}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleShowModal(todo._id || todo.id)}
                    // onClick={() => onDelete?.(todo.id)}
                    title="Delete Todo"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 2} className="text-center">
                No todos available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <AlertModal
        onDelete={handleDelete}
        isOpen={isOpen}
        onClose={closeModal}
        title="My Modal"
      />
    </div>
  );
}
