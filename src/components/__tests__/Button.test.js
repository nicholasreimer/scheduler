//---------------------------------------------------------------------------------
import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Button from "components/Button";

//---------------------------------------------------------------------------------

//?
afterEach(cleanup);

// RENDER TEST: verifies that we can render the component to the DOM without throwing an error.
it("renders without crashing", () => {
  render(<Button />);
});

it("renders its `children` prop as text", () => {
  const { getByText } = render(<Button>Default</Button>);
  expect(getByText("Default")).toBeInTheDocument();
});

it("renders a default button style", () => {
  const { getByText } = render(<Button>Default</Button>);
  expect(getByText("Default")).toHaveClass("button");
});

it("renders a confirm button", () => {
  const { getByText } = render(<Button confirm>Confirm</Button>);
  expect(getByText("Confirm")).toHaveClass("button--confirm");
});

it("renders a danger button", () => {
  const { getByText } = render(<Button danger>Danger</Button>);
  expect(getByText("Danger")).toHaveClass("button--danger");
});

it("renders a clickable button", () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <Button onClick={handleClick}>Clickable</Button>
  );

  const button = getByText("Clickable");

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

it("renders a disabled button", () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <Button disabled onClick={handleClick}>
      Disabled
    </Button>
  );

  const button = getByText("Disabled");

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(0);
});

// EXAMPLE OF A UNIT TEST:

//---------------------------------------------------------------------------------
// IMPORTS:
// we are importing these specific modules from the react-testing-library
// import { render, cleanup, fireEvent } from "@testing-library/react";

//we are importing button so that we can test it
// import Button from "components/Button";

//---------------------------------------------------------------------------------
// Structure of a UNIT TEST:
// 1.) Initialize the component that we would like to test.
// 2.) Trigger the change that executes the unit.
// 3.) Verify that the unit produced the expected result.

//?
// afterEach(cleanup);

// RENDER TEST: (very common first test for any componnent)
// -verifies that we can render the component to the DOM without throwing an error.
// it("renders without crashing", () => {
//   render(<Button />);
// });

/* TEST SYNTAX:
it (1st ARG: "a descriptive names for the test", 2nd ARG: a function 
 that contains the test code. )
*/

// it("renders its `children` prop as text", () => {
//   const { getByText } = render(<Button>Default</Button>);
//   expect(getByText("Default")).toBeInTheDocument();
// });

/*
The render function is imported from the react-testing-library.
The expect function is injected into the global scope by Jest.
The getByText query function is returned by the render function but is a part of the the dom-testing-library.
The toBeInTheDocument function is a matcher provided through Jest by the jest-dom library.
*/
