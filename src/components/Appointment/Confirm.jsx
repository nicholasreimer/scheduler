// CONFIRM - (OF APPOINTMENT)
// -Confirm allows a user to confirm a destructive action
//----------------------------------------------------------------------------------------------------------
//IMPORTS:
import React from "react";
import Button from "components/Button.jsx";
//----------------------------------------------------------------------------------------------------------
//PROPS THAT WILL BE PASSED TO COMPONENT:

// 1.) ??

//----------------------------------------------------------------------------------------------------------
//COMPONENT DECLARATION:

export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>
          Cancel
        </Button>
        <Button danger onClick={props.onConfirm}>
          Confirm
        </Button>
      </section>
    </main>
  );
}
