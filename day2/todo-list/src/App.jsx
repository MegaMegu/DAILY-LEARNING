import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    axios
      .post("http://localhost:5000/todos", { text: value })
      .then((res) => {
        setTasks((prev) => [res.data, ...prev]);
        setText("");
      })
      .catch((err) => console.error(err));
  };

  const toggleTask = (id) => {
    axios
      .patch(`http://localhost:5000/todos/${id}`)
      .then((res) => {
        setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex justify-center items-center gap-2 flex-col bg-gradient-to-br from-[#154D71] via-[#1C6EA4] to-[#33A1E0] p-6 rounded-xl max-w-md">
        <h1 className="text-2xl font-semibold text-slate-800 text-white">
          Day 2 — Todo-list
        </h1>
        <p className="text-white">Add tasks and mark them done!</p>
        <div className="flex items-center justify-center flex-col">
          <form className="mt-4 flex gap-5" onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="Task"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              className="flex-1 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300 text-white"
            />
            <button
              type="submit"
              disabled={!text.trim()}
              className="rounded-xl px-4 py-2 bg-gradient-to-r from-[#154D71] via-[#1C6EA4] to-[#33A1E0] text-white hover:scale-109 transition"
              title="Add Task"
            >
              Add
            </button>
          </form>
          {tasks.length === 0 && (
            <p className="mt-5 text-white self-center">
              No tasks yet. Add your first one!
            </p>
          )}
          {tasks.length > 0 && (
            <p className="mt-4 text-sm text-white">
              You have{" "}
              <span className="font-medium text-[#FFF9AF]">
                {tasks.filter((t) => !t.completed).length}
              </span>{" "}
              tasks left.
            </p>
          )}

          <ul className="mt-5 space-y-2 self-start w-full">
            {tasks.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between rounded-xl border-2 border-sky-300 p-3 text-white"
              >
                <span
                  className={
                    t.completed ? "line-through text-[#FFF9AF]" : "text-white"
                  }
                >
                  {t.text}
                </span>
                <button
                  onClick={() => toggleTask(t.id)}
                  className="text-sm px-3 py-1 rounded-lg border-1 border-sky-300 hover:scale-105 transition"
                  title="Toggle Complete"
                >
                  {t.completed ? "Undo" : "Done"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default App;
