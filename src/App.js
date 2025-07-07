import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import {
  getTasks,
  saveTasks,
  getUsername,
  clearUsername,
} from "./utils/localStorage";

function App() {
  const [username, setUsername] = useState(getUsername());
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleLogin = (name) => {
    setUsername(name);
  };

  const handleLogout = () => {
    clearUsername();
    setUsername("");
  };

  const handleSaveTask = (task) => {
    if (task.id) {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, ...task } : t))
      );
      setEditingTask(null);
    } else {
      setTasks((prev) => [
        ...prev,
        {
          ...task,
          id: Date.now().toString(),
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      if (editingTask && editingTask.id === id) setEditingTask(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Tracker</h1>
        <div className="user-info">
          <span>Welcome, {username}!</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>
      <main>
        <TaskForm
          onSave={handleSaveTask}
          editingTask={editingTask}
          onCancel={handleCancelEdit}
        />
        <TaskFilter
          currentFilter={filter}
          onChange={setFilter}
          counts={counts}
        />
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleComplete}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;
