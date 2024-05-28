import { IMovie } from "../../src/ts/models/Movie";

describe("main tests", () => {
  const movies: IMovie[] = [
    {
      Title: "B",
      imdbID: "idB",
      Type: "typeB",
      Poster: "posterB",
      Year: "yearB",
    },
    {
      Title: "A",
      imdbID: "idA",
      Type: "typeA",
      Poster: "posterA",
      Year: "yearA",
    },
    {
      Title: "F",
      imdbID: "idF",
      Type: "typeF",
      Poster: "posterF",
      Year: "yearF",
    },
    {
      Title: "C",
      imdbID: "idC",
      Type: "typeC",
      Poster: "posterC",
      Year: "yearC",
    },
    {
      Title: "E",
      imdbID: "idE",
      Type: "typE",
      Poster: "posterE",
      Year: "yearE",
    },
    {
      Title: "F",
      imdbID: "idD",
      Type: "typeD",
      Poster: "posterD",
      Year: "yearD",
    },
  ];
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
});
