// DAY LIST ITEM - COMPONENT FILE:
//----------------------------------------------------------------------------------------------------------
//IMPORTS:
import React from "react";
import "DayListItem.scss";
import classNames from "classnames";
//---------------------------------------------------------------------------------------------------------------------
//COMPONENT DECLARATION:

// CLEAN WAY: builds dynamic className based of whether the given values of the prop object keys meet the criteria
// EX: buttonClass = "button" + "button--confirm" if props.confirm exsists within the prop object passed to Button
const buttonClass = classNames("button", {
  "button--confirm": props.confirm,
  "button--danger": props.danger,
});

export default function DayListItem(props) {
  return (
    <li className={buttonClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}
