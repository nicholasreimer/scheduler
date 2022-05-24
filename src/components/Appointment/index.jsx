// APPOINTMENT INDEX - COMPONENT FILE:

//----------------------------------------------------------------------------------------------------------
//IMPORTS:
import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode.js";

import Status from "components/Appointment/Status.jsx";
import Header from "components/Appointment/Header.jsx";
import Show from "components/Appointment/Show.jsx";
import Empty from "components/Appointment/Empty.jsx";
import Form from "components/Appointment/Form";

//------------------------------------------------------------------------------------------------------
//these are MODES that are used by the useVisualMode custom hook
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

//----------------------------------------------------------------------------------------------------------
//APPOINTMENT COMPONENT DECLARATION:
//----------------------------------

export default function Appointment(props) {
  // Is responsible for showing each individual interview slot
  // If there is not an interview scheduled it renders the empty space for that time slot
  // We call our custom hook, if "show" has a value then it becomes the func param
  // if it does not we pass "empty" as the func param
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //---------------------------------------------
  // SAVE FUNC:
  // -is called when the user clicks the save button on the form component via a onClick event
  // -it takes the current state of name and interviwer of the form component and passes it to this func via props
  // -this func turns that info into an object and then feeds it to the bookInterview func within Application.jsx
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props.bookInterview(props.id, interview).then(() => transition(SHOW));
    // -We pass SHOW to the transition func with no other args, which adds show to the
    //  history array which then allows the appointment to build and render on the show component
  }

  //---------------------------------------------
  // DELETE FUNC:
  // -client clicks the delete button in show component, that triggers a function call to onDeleteAppointment
  //  here in index.jsx, which then triggers the cancelInterview() within the apppointment component
  function onDeleteAppointment() {
    transition(DELETING);

    props.cancelInterview(props.id).then(() => transition(EMPTY));
  }

  //----------------------------------------------------------------------------------------------------------
  // APPOINTMENT COMPONENT JSX/HTML RENDER:

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDeleteAppointment}
        />
      )}

      {mode === SAVING && <Status message={"Saving"} />}

      {mode === DELETING && <Status message={"Deleting"} />}

      {mode === CREATE && (
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onCancel={back}
          save={save}
        />
      )}
    </article>
  );
}
