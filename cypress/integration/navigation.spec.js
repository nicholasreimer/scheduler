// CYPRESS TESTS: NAVIGATION
//-----------------------------------------------------------------------------------------------------------

describe("Navigation", () => {
  //-----------------------------------------------------------------------------------------------------------
  // TEST 1:
  it("should visit root", () => {
    cy.visit("/");
  });

  //-----------------------------------------------------------------------------------------------------------
  // TEST 2:
  // -the test should go the website, and get the list item that contains the value Tuesday and click on it
  // -the test should pass when the css background color of the list item containing tuesday meets a specific color code
  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });

  //-----------------------------------------------------------------------------------------------------------
}); //END OF DESCRIBE BLOCK
