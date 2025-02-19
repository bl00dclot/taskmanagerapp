// components/TaskList.tsx
import React from "react";
import { Task } from "./TaskManager";

interface TaskListProps {
  tasks: Task[];
  toggleTaskCompletion: (taskId: string) => void;
  editTask: (taskId: string, newTitle: string, newDescription: string) => void;
  deleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleTaskCompletion,
  editTask,
  deleteTask,
}) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => toggleTaskCompletion(task.id)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
          <button
            onClick={() => {
              const newTitle = prompt("New title", task.title);
              const newDescription = prompt("New description", task.description);
              if (newTitle !== null && newDescription !== null) {
                editTask(task.id, newTitle, newDescription);
              }
            }}
          >
            Edit
          </button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
