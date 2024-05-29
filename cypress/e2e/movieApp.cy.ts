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
      .should("have.text", "Frozen");
    cy.get("div#movie-container > div > h3")
      .eq(2)
      .should("have.text", "Frozen Fever");
  });

  it("should get one or more movies from mocked list when searching with a value, all sorted", () => {
    cy.intercept("http://omdbapi.com/?apikey=416ed51a&s=*", {
      Search: [
        {
          Title: "Movie B",
          imdbID: "idB",
          Type: "typeB",
          Poster: "posterB",
          Year: "yearB",
        },
        {
          Title: "Movie A",
          imdbID: "idA",
          Type: "typeA",
          Poster: "posterA",
          Year: "yearA",
        },
        {
          Title: "Movie F",
          imdbID: "idF",
          Type: "typeF",
          Poster: "posterF",
          Year: "yearF",
        },
        {
          Title: "Movie C",
          imdbID: "idC",
          Type: "typeC",
          Poster: "posterC",
          Year: "yearC",
        },
        {
          Title: "Movie E",
          imdbID: "idE",
          Type: "typE",
          Poster: "posterE",
          Year: "yearE",
        },
        {
          Title: "Movie F",
          imdbID: "idD",
          Type: "typeD",
          Poster: "posterD",
          Year: "yearD",
        },
      ],
    });

    cy.get("input#searchText").type("Movie");
    cy.get("button#search").click();
    cy.get("div#movie-container > div > h3")
      .eq(0)
      .should("have.text", "Movie A");
    cy.get("div#movie-container > div > h3")
      .eq(1)
      .should("have.text", "Movie B");
    cy.get("div#movie-container > div > h3")
      .eq(2)
      .should("have.text", "Movie C");
    cy.get("div#movie-container > div > h3")
      .eq(3)
      .should("have.text", "Movie E");
    cy.get("div#movie-container > div > h3")
      .eq(4)
      .should("have.text", "Movie F");
    cy.get("div#movie-container > div > h3")
      .eq(5)
      .should("have.text", "Movie F");
  });
});
