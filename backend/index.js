const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Connect to local MongoDB
mongoose.connect("mongodb://localhost:27017/tododb")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

// 📌 Define Todo model
const TodoSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
});
const Todo = mongoose.model("Todo", TodoSchema);

// 🟢 Routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.status(201).json(todo);
});

app.put("/todos/:id", async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// 🚀 Start server
app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
