// components/TaskForm.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../../src/app/components/TaskForm";

describe("TaskForm Component", () => {
  test("calls addTask with correct values and clears inputs on submit", () => {
    // Create a mock function for addTask
    const addTaskMock = jest.fn();
    render(<TaskForm addTask={addTaskMock} />);
    
    // Get the input fields and submit button
    const titleInput = screen.getByPlaceholderText("Task title") as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText("Task description (optional)") as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: /add task/i });
    
    // Simulate user entering values
    fireEvent.change(titleInput, { target: { value: "New Task" } });
    fireEvent.change(descriptionInput, { target: { value: "New Description" } });
    
    // Submit the form
    fireEvent.click(submitButton);
    
    // Check that addTask was called with the expected arguments
    expect(addTaskMock).toHaveBeenCalledWith("New Task", "New Description");
    
    // Check that the input fields are cleared after submission
    expect(titleInput.value).toBe("");
    expect(descriptionInput.value).toBe("");
  });

  test("does not call addTask if title is empty", () => {
    const addTaskMock = jest.fn();
    render(<TaskForm addTask={addTaskMock} />);
    
    const titleInput = screen.getByPlaceholderText("Task title") as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: /add task/i });
    
    // Simulate entering an empty title (or whitespace only)
    fireEvent.change(titleInput, { target: { value: "   " } });
    
    // Submit the form
    fireEvent.click(submitButton);
    
    // Expect that addTask was not called since the title is empty after trimming
    expect(addTaskMock).not.toHaveBeenCalled();
  });
});
