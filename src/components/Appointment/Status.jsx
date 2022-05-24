// STATUS - (OF APPOINTMENT)
// -Status informs the user that an operation is in progress
//----------------------------------------------------------------------------------------------------------
//IMPORTS:
import React from "react";

//----------------------------------------------------------------------------------------------------------
//PROPS THAT WILL BE PASSED TO COMPONENT:

// 1.) ??

//----------------------------------------------------------------------------------------------------------
//COMPONENT DECLARATION:

export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}
