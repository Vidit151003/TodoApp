import React, { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
    const savedMode = JSON.parse(localStorage.getItem("darkMode")) || false;
    setDarkMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [todos, darkMode]);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos([...todos, { text, completed: false, id: Date.now() }]);
    setInput("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: darkMode ? "#1a1a2e" : "#f5f5f5",
        padding: "2rem",
        transition: "background 0.3s",
      }}
    >
      <div
        style={{
          background: darkMode ? "#162447" : "#ffffff",
          width: "90%",          // fill most of the screen width
          maxWidth: "700px",     // but not too wide on big screens
          padding: "2rem 3rem",  // more padding for a spacious look
          borderRadius: "12px",
          boxShadow: darkMode
            ? "0 6px 30px rgba(0,0,0,0.5)"
            : "0 6px 30px rgba(0,0,0,0.1)",
          transition: "all 0.3s",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: darkMode ? "#f0f0f0" : "#333",
            marginBottom: "2rem",
            fontSize: "2rem",
          }}
        >
          Todo App
        </h1>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            style={{
              flex: 1,
              padding: "1rem 1.2rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              outline: "none",
              background: darkMode ? "#1f1f3d" : "#fff",
              color: darkMode ? "#f0f0f0" : "#333",
              borderColor: darkMode ? "#444" : "#ddd",
              transition: "all 0.2s",
            }}
          />
          <button
            onClick={addTodo}
            style={{
              padding: "1rem 1.5rem",
              borderRadius: "8px",
              border: "none",
              background: "#6c63ff",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Add
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: darkMode ? "#1f1f3d" : "#f9f9f9",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                marginBottom: "0.75rem",
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed
                  ? darkMode
                    ? "#888"
                    : "#888"
                  : darkMode
                  ? "#f0f0f0"
                  : "#333",
                transition: "all 0.3s",
              }}
            >
              <span>{todo.text}</span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => toggleComplete(todo.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6c63ff",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                >
                  ✔
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ff4d4f",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                >
                  ✖
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: darkMode ? "#f0f0f0" : "#1a1a2e",
              color: darkMode ? "#1a1a2e" : "#f0f0f0",
              transition: "all 0.3s",
            }}
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
