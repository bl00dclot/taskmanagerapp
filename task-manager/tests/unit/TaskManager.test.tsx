// components/TaskManager.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskManager, { Task } from "../../src/app/components/TaskManager";
import '@testing-library/jest-dom';


// Define props interface for TaskForm
interface TaskFormProps {
  addTask: (title: string, description?: string) => void;
}

// Mock TaskForm using the defined interface
jest.mock("../../src/app/components/TaskForm.tsx", () => {
  return function DummyTaskForm(props: TaskFormProps) {
    return (
      <button
        data-testid="add-task-btn"
        onClick={() => props.addTask("Test Task", "Test Description")}
      >
        Add Task
      </button>
    );
  };
});

// Define props interface for TaskList
interface TaskListProps {
  tasks: Task[];
  toggleTaskCompletion: (taskId: string) => void;
  editTask: (taskId: string, newTitle: string, newDescription: string) => void;
  deleteTask: (taskId: string) => void;
}

// Mock TaskList using the defined interface
jest.mock("../../src/app/components/TaskList", () => {
  return function DummyTaskList(props: TaskListProps) {
    return (
      <div data-testid="task-list">
        {props.tasks.map((task) => (
          <div
            key={task.id}
            data-testid={`task-${task.id}`}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            <span>{task.title}</span>
            <button
              data-testid={`toggle-${task.id}`}
              onClick={() => props.toggleTaskCompletion(task.id)}
            >
              Toggle
            </button>
            <button
              data-testid={`edit-${task.id}`}
              onClick={() =>
                props.editTask(task.id, "Edited Title", "Edited Description")
              }
            >
              Edit
            </button>
            <button
              data-testid={`delete-${task.id}`}
              onClick={() => props.deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  };
});

// --- Test Cases ---

describe("TaskManager Component", () => {
  test("adds a new task", () => {
    render(<TaskManager />);
    // Click the mocked add button from TaskForm
    const addButton = screen.getByTestId("add-task-btn");
    fireEvent.click(addButton);
    // Verify that "Test Task" appears in the task list.
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  test("toggles task completion", () => {
    render(<TaskManager />);
    // Add a task
    fireEvent.click(screen.getByTestId("add-task-btn"));

    // Retrieve the task container element (parent of the task title)
    const taskContainer = screen.getByText("Test Task").parentElement;
    // Initially, the task should not have a line-through style.
    expect(taskContainer).toHaveStyle("text-decoration: none");

    // Click the toggle button
    const toggleButton = screen.getByText("Toggle");
    fireEvent.click(toggleButton);

    // After toggling, the task container should show a line-through style.
    expect(taskContainer).toHaveStyle("text-decoration: line-through");
  });

  test("edits a task", () => {
    render(<TaskManager />);
    // Add a task first.
    fireEvent.click(screen.getByTestId("add-task-btn"));
    // Click the edit button.
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);
    // Verify that the task title updates to "Edited Title".
    expect(screen.getByText("Edited Title")).toBeInTheDocument();
  });

  test("deletes a task", () => {
    render(<TaskManager />);
    // Add a task.
    fireEvent.click(screen.getByTestId("add-task-btn"));
    // Confirm the task exists.
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    // Click the delete button.
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    // Verify that the task is removed from the document.
    expect(screen.queryByText("Test Task")).toBeNull();
  });
});
