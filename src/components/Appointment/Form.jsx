// FORM COMPONENT:
//----------------------------------------------------------------------------------------------------------
//IMPORTS:
import React, { useState } from "react";

import Button from "components/Button.jsx";
import InterviewerList from "components/InterviewerList";

//----------------------------------------------------------------------------------------------------------
//COMPONENT DECLARATION:

export default function Form(props) {
  // If props.student is undefined then it will use the empty string as the default state for student
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //RESET FUNC: gets called by cancel() and resets the form values by targeting the change state functions
  const reset = () => {
    setError("");
    setStudent("");
    setInterviewer(null);
  };

  //----------------------------------------------------------------------------------------------------------
  //VALIDATE: a function that will send the appropriate props to the save function within the appointment component
  function validate() {
    if (!student) {
      setError("student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    setError("");

    props.onSave(student, interviewer);
  }

  //----------------------------------------------------------------------------------------------------------
  //CANCEL FUNC: gets called by onClick of cancel button. calls the reset func and runs code for storybook
  function cancel() {
    reset();
    props.onCancel();
  }

  //----------------------------------------------------------------------------------------------------------
  // RENDER:
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            onChange={(event) => setStudent(event.target.value)}
            value={student}
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
