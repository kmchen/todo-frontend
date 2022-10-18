/// <reference types="cypress" />

describe("Todo frontend", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("displays no todo items by default", () => {
    cy.get("[data-test=task]").should("have.length", 0);
  });

  it("adds new todo", () => {
    const newTodoText = "helloworld";

    cy.get("[data-test=todoInput]").type(`${newTodoText}{enter}`);

    cy.contains(newTodoText);
  });

  it("does not add empty todo", () => {
    cy.get("[data-test=task]").then((tasks) => {
      cy.get("[data-test=todoInput]").type(`{enter}`);
      cy.get("[data-test=task]").should("have.length", tasks.length);
    });
  });

  it("completes and uncomplete a todo", () => {
    // Mark todo as completed
    cy.get("[data-test=task]")
      .first()
      .find("[data-test=completeBtn]")
      .click()
      .parents('[data-test="task"]')
      .should(
        "have.css",
        "text-decoration",
        "line-through solid rgb(255, 255, 255)"
      )
      // Uncomplete todo
      .find("[data-test=completeBtn]")
      .click()
      .parents('[data-test="task"]')
      .not("have.css", "text-decoration");
  });

  it("mark and unmark a todo as important", () => {
    // Mark todo as important
    cy.get("[data-test=task]")
      .first()
      .find("[data-test=importantBtn]")
      .click()
      .parents('[data-test="task"]')
      .should(
        "have.css",
        "background-image",
        "linear-gradient(90deg, rgb(255, 127, 80) 0%, rgb(255, 127, 80) 100%)"
      )
      // Mark todo as important
      .find("[data-test=importantBtn]")
      .click()
      .parents('[data-test="task"]')
      .should(
        "have.css",
        "background-image",
        "linear-gradient(90deg, rgb(20, 159, 255) 0%, rgb(17, 122, 255) 100%)"
      );
  });

  it("delete a todo", () => {
    cy.get("[data-test=task]").then((tasks) => {
      cy.wrap(tasks).first().find("[data-test=deleteBtn]").click();
      cy.get("[data-test=task]").should("have.length", tasks.length - 1);
    });
  });
});
