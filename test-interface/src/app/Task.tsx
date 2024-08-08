import React from "react";

interface TaskProps {
  task: {
    id: number;
    text: string;
    completed: boolean;
  };
  toggleTask: (id: number) => void;
}

export const Task: React.FC<TaskProps> = ({ task, toggleTask }) => (
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => toggleTask(task.id)}
      className="form-checkbox h-5 w-5 text-teal-600"
    />
    <span
      className={`flex-1 ${
        task.completed ? "line-through text-gray-500" : "text-gray-900"
      }`}
    >
      {task.text}
    </span>
  </div>
);
