describe("Journalist can create an article", () => {
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
    cy.get("[data-cy='login-form']").within(() => {
      cy.get("[data-cy='email']").type("journalist@mail.com");
      cy.get("[data-cy='password']").type("password");
      cy.get("[data-cy='submit-btn']").contains("Submit").click();
    });
  });

  it("is expected to successfully fill in ", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/articles",
      response: { message: "Your article was successfully created" },
    });
    cy.get("[data-cy='article-form']").within(() => {
      cy.get("[data-cy='title-field']").type("Article Title");
      cy.get("[data-cy='lead-field']").type("Article Lead");
      cy.get("[data-cy='body-field']").type("Article Body");
      cy.get('[data-cy="categories-dropdown"]').select("Culture");
      cy.get("[data-cy='create-article-button']").click();
      cy.get("[data-cy='api-response-success-message']").should(
        "contain",
        "Your article was successfully created"
      );
    });
  });

  describe("Sad path: Journalist can not create an article", () => {
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
    });

    it("when title is not filled in ", () => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/articles",
        response: { message: "Title can't be blank" },
        status: 422,
      });

      cy.get("[data-cy='article-form']").within(() => {
        cy.get("[data-cy='lead-field']").type("Article Lead");
        cy.get("[data-cy='body-field']").type("Article Body");
        cy.get('[data-cy="categories-dropdown"]').select("Culture");
        cy.get("[data-cy='create-article-button']").click();
        cy.get("[data-cy='api-response-error-message']").should(
          "contain",
          "Title can't be blank"
        );
      });
    });
    it("when lead is not filled in ", () => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/articles",
        response: { message: "Lead can't be blank" },
        status: 422,
      });
      cy.get("[data-cy='article-form']").within(() => {
        cy.get("[data-cy='title-field']").type("Article Title");
        cy.get("[data-cy='body-field']").type("Article Body");
        cy.get('[data-cy="categories-dropdown"]').select("Culture");
        cy.get("[data-cy='create-article-button']").click();
        cy.get("[data-cy='api-response-error-message']").should(
          "contain",
          "Lead can't be blank"
        );
      });
    });
    it("when body is not filled in ", () => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/articles",
        response: { message: "Body can't be blank" },
        status: 422,
      });
      cy.get("[data-cy='article-form']").within(() => {
        cy.get("[data-cy='title-field']").type("Article Title");
        cy.get("[data-cy='lead-field']").type("Article Lead");
        cy.get('[data-cy="categories-dropdown"]').select("Culture");
        cy.get("[data-cy='create-article-button']").click();
        cy.get("[data-cy='api-response-error-message']").should(
          "contain",
          "Body can't be blank"
        );
      });
    });
    it("when category is not selected", () => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/articles",
        response: { message: "Category must exist" },
        status: 422,
      });
      cy.get("[data-cy='article-form']").within(() => {
        cy.get("[data-cy='title-field']").type("Article Title");
        cy.get("[data-cy='lead-field']").type("Article Lead");
        cy.get("[data-cy='body-field']").type("Article Body");
        cy.get("[data-cy='create-article-button']").click();
        cy.get("[data-cy='api-response-error-message']").should(
          "contain",
          "Category must exist"
        );
      });
    });
  });
});
