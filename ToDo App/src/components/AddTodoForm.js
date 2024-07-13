import { useState } from "react";

const AddTodoForm = ({ onTodoAdded }) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/updateTodo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: Number(id), title, completed }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newTodo = await response.json();
      onTodoAdded(newTodo);
      setId("");
      setTitle("");
      setCompleted(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          ID:
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Completed:
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </label>
      </div>
      <button type="submit">Add Todo</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddTodoForm;

// so to add to list, I need a form to add Id, title, and completed status to DB. This will be a PUT request.
