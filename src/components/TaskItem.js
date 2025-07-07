import React from "react";

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <div className={`task-item${task.completed ? " completed" : ""}`}>
      <div className="task-item-main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <div className="task-info">
          <div className="task-title">{task.title}</div>
          {task.description && (
            <div className="task-desc">{task.description}</div>
          )}
          <div className="task-meta">
            <span className="task-date">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            <span className="task-status">
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
