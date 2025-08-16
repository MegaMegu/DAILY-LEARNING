const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000; // Backend will run here

app.use(cors());
app.use(express.json()); // So we can handle JSON requests

let todos = [];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Task text is required" });
  }
  const newTask = { id: Date.now(), text, completed: false };
  todos.unshift(newTask);
  res.json(newTask);
});

app.patch("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  const updated = todos.find((t) => t.id === id);
  if (!updated) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(updated);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
