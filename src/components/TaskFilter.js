import React from "react";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "completed", label: "Completed" },
  { key: "pending", label: "Pending" },
];

const TaskFilter = ({ currentFilter, onChange, counts }) => {
  return (
    <div className="task-filter">
      {FILTERS.map((filter) => (
        <button
          key={filter.key}
          className={`filter-btn${
            currentFilter === filter.key ? " active" : ""
          }`}
          onClick={() => onChange(filter.key)}
        >
          {filter.label}{" "}
          <span className="filter-count">({counts[filter.key] || 0})</span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
