// FORM - (OF APPOINTMENT)
//----------------------------------------------------------------------------------------------------------
//IMPORTS:
import React from "react";

import Button from "components/Button.jsx";
import InterviewerList from "components/InterviewerList";
//----------------------------------------------------------------------------------------------------------
//PROPS THAT WILL BE PASSED TO COMPONENT:

// 1.) ??

//----------------------------------------------------------------------------------------------------------
//COMPONENT DECLARATION:

export default function Form(props) {
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            student={props.student}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>
            Cancel
          </Button>
          <Button confirm onClick={props.onSave}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
