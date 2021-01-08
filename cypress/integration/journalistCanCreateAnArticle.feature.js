/* eslint-disable no-undef */
describe("Journalist can create an article", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/articles",
      response: { message: "Your article was successfully created" },
    });
    cy.visit("/");
  });

  it("is expected to successfully fill in ", () => {
    cy.get("[data-cy='article-form']").within(() => {
      cy.get("[data-cy='title-field']").type("Article Title");
      cy.get("[data-cy='lead-field']").type("Article Lead");
      cy.get("[data-cy='body-field']").type("Article Body");
      // cy.get("[data-cy='categories']").within(() => {
        cy.get("[data-cy='categories-sports']").click()
      // })
      cy.get("[data-cy='create-article-button']").click();
      cy.get("[data-cy='api-response-message']").should(
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
        url: "http://localhost:3000/api/articles",
        response: { message: "Something went wrong!" },
      });
      cy.visit("/");
    });

    it("when title is not filled in ", () => {
      cy.get("[data-cy='article-form']").within(() => {
        cy.get("[data-cy='lead-field']").type("Article Lead");
        cy.get("[data-cy='body-field']").type("Article Body");
        cy.get("[data-cy='create-article-button']").click();
        cy.get("[data-cy='api-response-message']").should(
          "contain",
          "Something went wrong!"
        );
      });
    });

    it("when lead is not filled in ", () => {
      cy.get("[data-cy='article-form']").within(() => {
        cy.get("[data-cy='title-field']").type("Article Title");
        cy.get("[data-cy='body-field']").type("Article Body");
        cy.get("[data-cy='create-article-button']").click();
        cy.get("[data-cy='api-response-message']").should(
          "contain",
          "Something went wrong!"
        );
      });
    });

    it("when body is not filled in ", () => {
      cy.get("[data-cy='article-form']").within(() => {
        cy.get("[data-cy='title-field']").type("Article Title");
        cy.get("[data-cy='lead-field']").type("Article Lead");
        cy.get("[data-cy='create-article-button']").click();
        cy.get("[data-cy='api-response-message']").should(
          "contain",
          "Something went wrong!"
        );
      });
    });
  });
});
