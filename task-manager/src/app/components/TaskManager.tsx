// components/TaskManager.tsx
import { useState } from "react";
import { useEffect } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

// Define the structure of a Task
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

    // Load tasks from localStorage when the component mounts.
    useEffect(() => {
      // Ensure we're running in the browser
      if (typeof window !== "undefined") {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
          try {
            setTasks(JSON.parse(storedTasks));
          } catch (error) {
            console.error("Error parsing tasks from localStorage:", error);
          }
        }
      }
    }, []);

      // Save tasks to localStorage whenever tasks state changes.
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add a new task
  const addTask = (title: string, description: string = ""): void => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  // Toggle task completion status
  const toggleTaskCompletion = (taskId: string): void => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Edit an existing task
  const editTask = (taskId: string, newTitle: string, newDescription: string): void => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, title: newTitle, description: newDescription }
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId: string): void => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleTaskCompletion={toggleTaskCompletion}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default TaskManager;
