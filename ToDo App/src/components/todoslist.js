import { useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";

const TodosList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const toggleComplete = async (id, completed, event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/updateTodo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, completed }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedTodo = await response.json();

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    } catch (error) {
      setError(error);
    }
  };

  const handleToggleChange = () => {
    setShowOnlyOpen((prev) => !prev);
  };

  const handleTodoAdded = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const filteredTodos = showOnlyOpen
    ? todos.filter((todo) => !todo.completed)
    : todos;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Todo List</h2>
      <label>
        <input
          type="checkbox"
          checked={showOnlyOpen}
          onChange={handleToggleChange}
        />
        Show only open todos
      </label>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }}>
            {todo.title} - {todo.completed ? "Completed" : "Incomplete"}
            <button
              style={{ marginLeft: "10px" }}
              onClick={(event) =>
                toggleComplete(todo.id, !todo.completed, event)
              }
            >
              {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
          </li>
        ))}
      </ul>
      <AddTodoForm onTodoAdded={handleTodoAdded} />
    </div>
  );
};

export default TodosList;
