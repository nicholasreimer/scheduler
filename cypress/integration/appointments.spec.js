// CYPRESS TESTS: APPOINTMENTS
//-----------------------------------------------------------------------------------------------------------

describe("Appointments", () => {
  // Resets the DB by calling the api-server at a specific route
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  });
  //-----------------------------------------------------------------------------------------------------------
  // TEST 1:
  it("should book an interview", () => {
    // -go to the root of the server and confirm that the DOM contains the text "Monday"
    cy.visit("/");
    cy.contains("Monday");

    // -click the add button for the empty appointment
    // NOTE: .first() helps us target the first add button, this is becuase ther are multiple add buttons
    cy.get("[alt=Add]").first().click();

    // -find the input field for the student name via testid prop and type into the form this string (student name)
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // -find the input field for the interviewer named Sylvia and click it
    cy.get("[alt='Sylvia Palmer']").click();

    // -search the DOM for the string "Save" and click it
    cy.contains("Save").click();

    // -this confirms that the correct student and interviewer names exsist in the Show component
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  //-----------------------------------------------------------------------------------------------------------
  // TEST 2:
  it("should edit an interview", () => {
    // -find the edit button, make sure its the first one (top appointment), click it
    // NOTE: Forcing a click overrides the actionable checks, this is needed becuase of the dit buttons hover effect
    cy.get("[alt=Edit").first().click({ force: true });

    // -find the input field for the student name via testid prop
    // -clear the input and type into the form this string: "Lydia"
    cy.get("[data-testid=student-name-input]").clear().type("Lydia");

    // -find the input field for the interviewer named Tori Malcolm and click it
    cy.get("[alt='Tori Malcolm']").click();

    // -search the DOM for the string "Save" and click it
    cy.contains("Save").click();

    // -this confirms that the correct student and interviewer names exsist in the Show component
    cy.contains(".appointment__card--show", "Lydia");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  //-----------------------------------------------------------------------------------------------------------
  // TEST 3:
  it("Should cancel an interview", () => {
    //-find the delete button, make sure its the first one (top appointment), click it (force required for button hover)
    cy.get("[alt=Delete]").first().click({ force: true });

    // -find confirm popup and click it
    cy.contains("Confirm").click();

    // -this confirms the correct info exsisits in the appropriate components
    cy.contains("Deleting");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
  //-----------------------------------------------------------------------------------------------------------
});
