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

//----------------------------------------------------------------------------------------------------------
//APPOINTMENT COMPONENT DECLARATION:

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )}
    </article>
  );
}
