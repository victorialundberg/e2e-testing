import { IMovie } from "../../src/ts/models/Movie";

describe("main tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should get one or more movies from api when searching with a value", () => {
    // Act
    cy.get("input#searchText").type("Frozen");
    cy.get("button#search").click();

    // Assert
    cy.get("div#movie-container > div:first > h3:first").should(
      "have.text",
      "Frozen"
    );
  });
  it("should get no movies from api and display error when there are no matching movies", () => {
    // Act
    cy.get("input#searchText").type("SLKnsLKnLDfD");
    cy.get("button#search").click();

    // Assert
    cy.get("div#movie-container > p").should(
      "have.text",
      "Inga sökresultat att visa"
    );
  });
  it("should get no movies from api and display error when the search bar is empty", () => {
    // Act
    cy.get("button#search").click();

    // Assert
    cy.get("div#movie-container > p").should(
      "have.text",
      "Inga sökresultat att visa"
    );
  });

  // Note to self  update after implementing sorting function
  it("should by default sort movies in descending order", () => {
    // Act
    cy.get("input#searchText").type("Frozen");
    cy.get("button#search").click();

    // Assert
    cy.get("div#movie-container > div > h3")
      .eq(0)
      .should("have.text", "Frozen");
    cy.get("div#movie-container > div > h3")
      .eq(1)
      .should("have.text", "Frozen II");
  });

  it("should get one or more movies from mocked list when searching with a value", () => {
    cy.intercept("http://omdbapi.com/?apikey=416ed51a&s=*", {
      Search: [
        {
          Title: "B",
          imdbID: "idB",
          Type: "typeB",
          Poster: "posterB",
          Year: "yearB",
        },
      ],
    });

    cy.get("input#searchText").type("B");
    cy.get("button#search").click();
    cy.get("div#movie-container > div > h3").eq(0).should("have.text", "B");
  });
});
