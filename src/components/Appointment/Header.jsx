// HEADER - (OF APPOINTMENT)
//----------------------------------------------------------------------------------------------------------
//IMPORTS:
import React from "react";

//----------------------------------------------------------------------------------------------------------
//PROPS THAT WILL BE PASSED TO COMPONENT:

// 1.) ??

//----------------------------------------------------------------------------------------------------------
//COMPONENT DECLARATION:

export default function Header(props) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}
