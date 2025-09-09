import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch all todos
  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // Add todo
  const addTodo = async () => {
    if (!title.trim()) return;
    const res = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setTitle("");
  };

  // Toggle complete
  const toggleTodo = async (id, completed) => {
    const res = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    const updated = await res.json();
    setTodos(todos.map(t => (t._id === id ? updated : t)));
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Todo App</h1>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              onClick={() => toggleTodo(todo._id, todo.completed)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)} style={{ marginLeft: "10px" }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
