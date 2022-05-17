import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

// We import the components listed below so that this file can pass props to them while
// inside storybook
import Button from "components/Button";
import DayListItem from "components/DayListItem";

//---------------------------------------------------------------------------------------------------------------------
// Related to Storybook:
// each story describes a different version of the component we want to test
//---------------------------------------------------------------------------------------------------------------------

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

//---------------------------------------------------------------------------------------------------------------------
//Initiates Storybook and registers our DayListItem component
storiesOf("DayListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  }) // Provides the default background color for our component

  // To define our stories, we call add() once for each of our test states to generate a story for storybook
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />)
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)

  // action() allows us to create a callback that appears in the storybook actions panel when clicked
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
  ));

//---------------------------------------------------------------------------------------------------------------------
