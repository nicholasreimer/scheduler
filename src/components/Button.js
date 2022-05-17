// BUTTON COMPONENT FILE:
//----------------------------------------------------------------------------------------------------------
//IMPORTS:
import React from "react";

// Connects us to the styling scss file
import "components/Button.scss";

// Allows us to replace conditionals that built className attribute with simpler react specific syntax
import classNames from "classnames";

//---------------------------------------------------------------------------------------------------------------------
//COMPONENT DECLARATION:
// -We create a new component called Button, (components are similiar to functions)
export default function Button(props) {
  // MESSY WAY: of building class names based of a set of conditionals, it is replaced by the code that comes next------
  //let buttonClass = "button";
  //   if (props.confirm) {
  //     buttonClass += " button--confirm";
  //   }
  //-------------------------------------------------------------------------------------------------------------------

  // CLEAN WAY: builds dynamic className based of whether the given values of the prop object keys meet the criteria
  // EX: buttonClass = "button" + "button--confirm" if props.confirm exsists within the prop object passed to Button
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  // -the code above runs based of what index.js passes as props
  // -the code below dynamically populates based of how the code above runs,
  // -className for the button element is the value of var buttonClass
  // -onClick is an event listener housed in an elem attribute that listens for a users click, when clicked it will
  // run action("button-clicked") => this came from index.js becuase thats where props come from
  // -disabled is an elem attribute that when active/when inseretd into the button attribute it will disable the
  // ability for a user to click the button
  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
