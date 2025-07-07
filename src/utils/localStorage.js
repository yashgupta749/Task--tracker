// Utility functions for localStorage operations

export const saveTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const getTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

export const saveUsername = (username) => {
  localStorage.setItem("username", username);
};

export const getUsername = () => {
  return localStorage.getItem("username") || "";
};

export const clearUsername = () => {
  localStorage.removeItem("username");
};
