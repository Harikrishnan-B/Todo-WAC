import useSWR from 'swr';
import useTodoValidation from './useTodoValidation';

const useDatabase = () => {
  const apiUrl = 'http://localhost:5000';

  // SWR fetcher function
  const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  };

  // Use SWR for fetching todos
  const { data: todos = [], mutate, isValidating, error } = useSWR(`${apiUrl}/todos`, fetcher, {
    revalidateOnFocus: false,
  });

  // Pass fetched todos to validation
  const { errorMessage, validateTodo } = useTodoValidation(todos);

  // Handle adding a new todo
  const handleAddTodo = async (text) => {
    if (!validateTodo(text)) {
      return;
    }

    const newTodo = { text };

    try {
      const response = await fetch(`${apiUrl}/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const savedTodo = await response.json();

      // Mutate with revalidation
      await mutate();
    } catch (err) {
      console.error('Add Todo Error:', err.message);
    }
  };

  // Handle deleting a todo
  const deleteTodo = async (_id) => {
    try {
      const response = await fetch(`${apiUrl}/todos/${_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete todo with ID ${_id}`);
      }

      // Mutate with revalidation
      await mutate();
    } catch (err) {
      console.error('Delete Todo Error:', err.message);
    }
  };

  return {
    todos,
    isValidating, // SWR revalidation state
    error,
    handleAddTodo,
    deleteTodo,
    errorMessage,
  };
};

export default useDatabase;
