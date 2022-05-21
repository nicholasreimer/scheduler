// APPOINTMENT INDEX - COMPONENT FILE:
/* 
The Appointment component is very complex so we split it into many smaller components. 

Each of these components has a responsibility:
-Header displays the time for the appointment
-Empty allows a user to choose which time slot to book
-Show allows a user to see an existing appointment
-Confirm allows a user to confirm a destructive action
-Status informs the user that an operation is in progress
-Error informs the user when an error occurs
*/
//----------------------------------------------------------------------------------------------------------
//IMPORTS:
import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header.jsx";
import Show from "components/Appointment/Show.jsx";
import Empty from "components/Appointment/Empty.jsx";
import Form from "components/Appointment/Form";

import useVisualMode from "hooks/useVisualMode.js";
//----------------------------------------------------------------------------------------------------------
//APPOINTMENT COMPONENT DECLARATION:

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  // We call our custom hook, if "show" has a value then it becomes the func param
  // if it does not we pass "empty" as the func param
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onCancel={back}
        />
      )}
    </article>
  );
}
