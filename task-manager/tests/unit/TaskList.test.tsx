// components/TaskList.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../../src/app/components/TaskList";
import { Task } from "../../src/app/components/TaskManager";

describe("TaskList Component", () => {
  // Sample tasks array for testing
  const sampleTasks: Task[] = [
    {
      id: "1",
      title: "Task One",
      description: "Description One",
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Task Two",
      description: "Description Two",
      completed: true,
      createdAt: new Date().toISOString(),
    },
  ];

  // Create mock functions for the callbacks
  const toggleTaskCompletion = jest.fn();
  const editTask = jest.fn();
  const deleteTask = jest.fn();

  // Clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders a list of tasks", () => {
    render(
      <TaskList
        tasks={sampleTasks}
        toggleTaskCompletion={toggleTaskCompletion}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    );
    // Verify that each task's title and description appear in the document.
    expect(screen.getByText("Task One")).toBeInTheDocument();
    expect(screen.getByText("Description One")).toBeInTheDocument();
    expect(screen.getByText("Task Two")).toBeInTheDocument();
    expect(screen.getByText("Description Two")).toBeInTheDocument();
  });

  test("calls toggleTaskCompletion when toggle button is clicked", () => {
    render(
      <TaskList
        tasks={[sampleTasks[0]]}
        toggleTaskCompletion={toggleTaskCompletion}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    );
    // Since the task is not completed, the button should display "Complete"
    const toggleButton = screen.getByText("Complete");
    fireEvent.click(toggleButton);
    // Verify that the toggleTaskCompletion function is called with the task id "1"
    expect(toggleTaskCompletion).toHaveBeenCalledWith("1");
  });

  test("calls deleteTask when delete button is clicked", () => {
    render(
      <TaskList
        tasks={[sampleTasks[0]]}
        toggleTaskCompletion={toggleTaskCompletion}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    );
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    // Verify that deleteTask is called with the task id "1"
    expect(deleteTask).toHaveBeenCalledWith("1");
  });

  test("calls editTask when edit button is clicked and prompts return values", () => {
    // Override global prompt to simulate user input.
    const promptSpy = jest
      .spyOn(window, "prompt")
      .mockImplementationOnce(() => "Updated Task One") // First prompt call returns new title.
      .mockImplementationOnce(() => "Updated Description One"); // Second prompt call returns new description.

    render(
      <TaskList
        tasks={[sampleTasks[0]]}
        toggleTaskCompletion={toggleTaskCompletion}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    );
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    // Verify that prompt was called twice
    expect(promptSpy).toHaveBeenCalledTimes(2);
    // Verify that editTask was called with the updated values.
    expect(editTask).toHaveBeenCalledWith(
      "1",
      "Updated Task One",
      "Updated Description One"
    );
    promptSpy.mockRestore();
  });
});
