describe("Journalist can create an article", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/articles",
      response: "fixture:successfully_create_article.json",
    });
    cy.visit("/");
  });

  it("is expected to ", () => {
    cy.get("[data-cy='article-form']").within(() => {
      cy.get("[data-cy='title-field']").type("Article Title");
      cy.get("[data-cy='lead-field']").type("Article Lead");
      cy.get("[data-cy='body-field']").type("Article Body");
      cy.get("[data-cy='create-article-button']").click();
    });
  });
});
