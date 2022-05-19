// INDEX: (for Storybook)
//----------------------------------------------------------------------------------------------------------
//IMPORTS:
import React from "react";
import "index.scss";

import { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

//---------------------------------------------------------------------------------------------------------------------
// COMPONENT IMPORTS: import the components listed below so that this file can pass props to them in storybook

//COMPONENTS FOLDER:
import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";

//APPOINTMENT COMPONENTS FOLDER:
import Appointment from "components/Appointment/index.js";
import Header from "components/Appointment/Header.jsx";
import Empty from "components/Appointment/Empty.jsx";
import Show from "components/Appointment/Show.jsx";
import Confirm from "components/Appointment/Confirm.jsx";
import Status from "components/Appointment/Status.jsx";
import Error from "components/Appointment/Error.jsx";
import Form from "components/Appointment/Form.jsx";

//---------------------------------------------------------------------------------------------------------------------
// Stories for Storybook:
// each story describes a different version of the component we want to test
//---------------------------------------------------------------------------------------------------------------------
// BUTTON STORIES:
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
// DAYLIST ITEM STORIES:
storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
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
// DAYLIST STORIES:

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} value={"Monday"} onChange={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} value={"Tuesday"} onChange={action("setDay")} />
  ))
  .add("Wednesday", () => (
    <DayList days={days} value={"Wednesday"} onChange={action("setDay")} />
  ));

//---------------------------------------------------------------------------------------------------------------------
// INTERVIEWER LIST ITEM STORIES:

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png",
};

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={() => action("setInterviewer")(interviewer.id)}
    />
  ));

//---------------------------------------------------------------------------------------------------------------------
// INTERVIEWER LIST STORIES:

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Initial", () => <InterviewerList interviewers={interviewers} />)
  .add("Selected", () => (
    <InterviewerList interviewers={interviewers} value={3} />
  ))
  .add("Clickable", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("setInterviewer")}
    />
  ));

//---------------------------------------------------------------------------------------------------------------------
// APPOINTMENT STORIES:
// -The stories seperated bellow allow us to test each of the smaller components in isolation.
// -If we had built out all of the <Appointment> logic in one file we would have to write
//  a single giant story for all of it.

storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }],
  })
  .add("Appointment", () => <Appointment />)

  .add("Appointment with Time", () => <Appointment time="12pm" />)

  .add("Header", () => <Header time="12pm" />)

  .add("Empty", () => <Empty onAdd={action("onAdd")} />)

  .add("Show", () => (
    <Show
      student="Lydia Miller-Jones"
      interviewer={interviewers}
      onEdit={action("onEdit")}
      onDelete={action("onDelete")}
    />
  ))

  .add("Confirm", () => (
    <Confirm
      message="Delete the appointment?"
      onConfirm={action("onConfirm")}
      onCancel={action("onCancel")}
    />
  ))

  .add("Status", () => <Status message="Deleting" />)

  .add("Error", () => (
    <Error
      message="Could not delete appointment."
      onClose={action("onClose")}
    />
  ))

  .add("Form - Edit Story", () => (
    <Form
      student="Nico"
      interviewer={2}
      interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))

  .add("Form - Create Story", () => (
    <Form
      interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))

  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="4pm" />
      <Appointment time="5pm" />
    </Fragment>
  ))

  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="4pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment time="5pm" />
    </Fragment>
  ));
