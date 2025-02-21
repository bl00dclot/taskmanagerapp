// cypress/e2e/taskmanager.spec.ts

describe("Task Manager App", () => {
  // Runs before each test to visit the homepage
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // adjust URL if your dev server runs on a different port
  });

  it("should add a new task", () => {
    // Fill out the form fields and submit the form
    cy.get("input[placeholder='Task title']").type("Cypress Test Task");
    cy.get("input[placeholder='Task description (optional)']").type("Cypress Description");
    cy.contains("Add Task").click();

    // Verify that the new task appears on the page
    cy.contains("Cypress Test Task").should("exist");
    cy.contains("Cypress Description").should("exist");
  });

  it("should toggle task completion", () => {
    // Add a new task first
    cy.get("input[placeholder='Task title']").type("Toggle Test Task");
    cy.get("input[placeholder='Task description (optional)']").type("Toggle Description");
    cy.contains("Add Task").click();

    // Locate the task item (using the task title)
    cy.contains("Toggle Test Task")
      .parent()
      .as("taskItem");

    // Initially, the text decoration should not be line-through
    cy.get("@taskItem").should("have.css", "text-decoration-line", "none");

    // Click the toggle button
    cy.contains("Toggle").click();

    // After toggling, check that the task item has a line-through style
    cy.get("@taskItem").should("have.css", "text-decoration-line", "line-through");
  });

  it("should edit a task", () => {
    // Add a task to edit
    cy.get("input[placeholder='Task title']").type("Edit Test Task");
    cy.get("input[placeholder='Task description (optional)']").type("Edit Description");
    cy.contains("Add Task").click();

    // Stub the window.prompt to simulate user input for editing
    cy.window().then((win) => {
      cy.stub(win, "prompt")
        .onFirstCall()
        .returns("Edited Task Title")
        .onSecondCall()
        .returns("Edited Description");
    });

    // Click the Edit button for the task
    cy.contains("Edit").click();

    // Verify that the task title has been updated
    cy.contains("Edited Task Title").should("exist");
    cy.contains("Edited Description").should("exist");
  });

  it("should delete a task", () => {
    // Add a task to delete
    cy.get("input[placeholder='Task title']").type("Delete Test Task");
    cy.get("input[placeholder='Task description (optional)']").type("Delete Description");
    cy.contains("Add Task").click();

    // Verify that the task exists
    cy.contains("Delete Test Task").should("exist");

    // Click the Delete button
    cy.contains("Delete").click();

    // Verify that the task is no longer in the document
    cy.contains("Delete Test Task").should("not.exist");
  });
});
