import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "./App";

const sampleTasks = [
  {
    id: 1,
    title: "Complete React assignment",
    description: "Build a task tracker application",
    completed: false,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Review JavaScript concepts",
    description: "Go through ES6+ features",
    completed: true,
    createdAt: "2024-01-14T15:30:00Z",
  },
];

describe("Task Tracker App", () => {
  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn((key) => {
      if (key === "tasks") return JSON.stringify(sampleTasks);
      if (key === "username") return "testuser";
      return null;
    });
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
  });

  test("renders tasks from localStorage", () => {
    render(<App />);
    expect(screen.getByText("Complete React assignment")).toBeInTheDocument();
    expect(screen.getByText("Review JavaScript concepts")).toBeInTheDocument();
  });

  test("shows correct completion status", () => {
    render(<App />);
    const taskItems = screen.getAllByRole("checkbox");
    // Find the parent task-item for each checkbox and check the status text
    const taskList = screen.getByRole("main").querySelector(".task-list");
    const taskDivs = taskList.querySelectorAll(".task-item");
    // First task is pending, second is completed
    expect(within(taskDivs[0]).getByText("Pending")).toBeInTheDocument();
    expect(within(taskDivs[1]).getByText("Completed")).toBeInTheDocument();
  });

  test("filters completed tasks", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Completed/i }));
    expect(screen.getByText("Review JavaScript concepts")).toBeInTheDocument();
    expect(
      screen.queryByText("Complete React assignment")
    ).not.toBeInTheDocument();
  });

  test("filters pending tasks", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Pending/i }));
    expect(screen.getByText("Complete React assignment")).toBeInTheDocument();
    expect(
      screen.queryByText("Review JavaScript concepts")
    ).not.toBeInTheDocument();
  });
});
