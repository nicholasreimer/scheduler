// INDEX - APPOINTMENT COMPONENT FILE:
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
import Error from "components/Appointment/Error";

//----------------------------------------------------------------------------------------------------------
//MODES:
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

//----------------------------------------------------------------------------------------------------------
//APPOINTMENT COMPONENT DECLARATION:
//----------------------------------------------------------------------------------------------------------

export default function Appointment(props) {
  // Is responsible for showing each individual interview slot
  // If there is not an interview scheduled it renders the empty space for that time slot
  // We call our custom hook, if "show" has a value then it becomes the func param
  // if it does not we pass "empty" as the func param
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //---------------------------------------------------------------------------------------------------------
  // SAVE APPOINTMENT FUNC:
  // -is called when the user clicks the save button on the form component via a onClick event
  // -it takes the current state of name and interviwer of the form component and passes it to this func via props
  // -this func turns that info into an object and then feeds it to the bookInterview func within Application.jsx
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING); //While the code is running we set the mode to saving for the show component

    // -We pass SHOW to the transition func with no other args, which adds show to the
    //  history array which then allows the appointment to build and render on the show component
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  //-----------------------------------------------------------------------------------------------------------
  // DELETE APPOINTMENT FUNC:
  // -client clicks the delete button in show component, that triggers a function call to onDeleteAppointment
  //  here in index.jsx, which then triggers the cancelInterview() within the apppointment component
  function onDeleteAppointment() {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  //---------------------------------------------------------------------------------------------------------
  // EDIT APPOINTMENT FUNC:
  function onEditAppointment(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(EDIT);
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
          onEdit={onEditAppointment}
        />
      )}

      {mode === ERROR_SAVE && <Error message={"ERROR: Save not working"} />}

      {mode === ERROR_DELETE && <Error message={"ERROR: Delete not working"} />}

      {mode === SAVING && <Status message={"Saving"} />}

      {mode === DELETING && <Status message={"Deleting"} />}

      {mode === CREATE && (
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          value={props.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  );
}

//---------------------------------------------------------------------------------------------------------
//END
