/* eslint-disable no-undef */
describe("Journalist can login to see article form", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth/sign_in",
      response: "fixture:journalist_can_login.json",
      headers: {
        uid: "journalist@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/auth/validate_token**",
      response: "fixture:journalist_can_login.json",
    });
    cy.visit("/");
  });
  describe("successfully", () => {
    it("with correct credentials", () => {
      cy.get("[data-cy='login-form']").within(() => {
        cy.get("[data-cy='email']").type("journalist@mail.com");
        cy.get("[data-cy='password']").type("password");
        cy.get("[data-cy='submit-btn']").contains("Submit").click();
      });
      cy.get("[data-cy='header-user-email']").should(
        "contain",
        "Meow! Welcome back journalist@mail.com"
      );
      cy.get("[data-cy='article-form']").should("exist");
    });
  });
  describe("unsuccessfully", () => {
    it("with wrong credentials", () => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth/sign_in",
        status: "401",
        response: {
          errors: ["Invalid login credentials. Please try again."],
          success: false,
        },
      });
      cy.get("[data-cy='login-form']").within(() => {
        cy.get("[data-cy='email']").type("journalist@mail.com");
        cy.get("[data-cy='password']").type("wrongpassword");
        cy.get("[data-cy='submit-btn']").contains("Submit").click();
        cy.get("[data-cy='error-message']").contains(
          "Invalid login credentials. Please try again."
        );
      });
      cy.get("[data-cy='header-user-email']").contains(
        "Woof! You're not logged in yet."
      );
      cy.get("[data-cy='article-form']").should("not.exist");
    });

    it("with right credentials but not an journalist", () => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth/sign_in",
        response: "fixture:registered_user_can_not_log_in.json",
      });
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/auth/validate_token**",
        response: "fixture:registered_user_can_not_log_in.json",
      });
      cy.visit("/");
      cy.get("[data-cy='login-form']").within(() => {
        cy.get("[data-cy='email']").type("registered@user.com");
        cy.get("[data-cy='password']").type("password");
        cy.get("[data-cy='submit-btn']").contains("Submit").click();
        cy.get("[data-cy='error-message']").contains(
          "You are not authorized to be here"
        );
      });
      cy.get("[data-cy='header-user-email']").contains(
        "Woof! You're not logged in yet."
      );
      cy.get("[data-cy='article-form']").should("not.exist");
    });
  });
});
