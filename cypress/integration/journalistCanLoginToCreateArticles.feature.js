describe("Journalist can login", () => {
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

  it("successfully with correct credentials", () => {
    cy.get("[data-cy='login-form']").within(() => {
      cy.get("[data-cy='email']").type("journalist@mail.com");
      cy.get("[data-cy='password']").type("password");
      cy.get("[data-cy='submit-btn']").contains("Submit").click();
    });
    cy.get("[data-cy='header-user-email']").should(
      "contain",
      "Logged in as journalist@mail.com"
    );
    cy.get("[data-cy='article-form']").should("exist");
  });

  it("unsuccessfully with wrong credentials", () => {
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
    cy.get("[data-cy='header-user-email']").contains("You're not logged in.");
    cy.get("[data-cy='article-form']").should("not.exist");
  });

  it("sad path: unsuccessfully with right credentials but not an journalist", () => {
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
    cy.get("[data-cy='header-user-email']").contains("You're not logged in.");
    cy.get("[data-cy='article-form']").should("not.exist");
  });
});
