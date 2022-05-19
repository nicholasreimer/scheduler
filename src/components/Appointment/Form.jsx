// FORM - (OF APPOINTMENT)
//----------------------------------------------------------------------------------------------------------
//IMPORTS:

import React, { useState } from "react";

import Button from "components/Button.jsx";
import InterviewerList from "components/InterviewerList";
//----------------------------------------------------------------------------------------------------------
//PROPS THAT WILL BE PASSED TO COMPONENT:

// 1.) ??

//----------------------------------------------------------------------------------------------------------
//COMPONENT DECLARATION:

export default function Form(props) {
  // If props.student is undefined then it will use the empty string as the default state for student
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  //RESET FUNC: gets called by cancel() and resets the form values by targeting the change state functions
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  //CANCEL FUNC: gets called by onClick of cancel button. calls the reset func and runs code for storybook
  function cancel() {
    reset();
    props.onCancel();
  }

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
          />
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
          <Button confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}
