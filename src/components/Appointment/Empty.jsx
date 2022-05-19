// EMPTY - (OF APPOINTMENT)
//----------------------------------------------------------------------------------------------------------
//IMPORTS:
import React from "react";

//----------------------------------------------------------------------------------------------------------
//PROPS THAT WILL BE PASSED TO COMPONENT:

// 1.) ??

//----------------------------------------------------------------------------------------------------------
//COMPONENT DECLARATION:

export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}
