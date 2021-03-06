// DAY LIST ITEM - COMPONENT FILE:
//----------------------------------------------------------------------------------------------------------
//IMPORTS:
import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";

//---------------------------------------------------------------------------------------------------------------------
//COMPONENT DECLARATION:
//----------------------
export default function DayListItem(props) {
  // DAY CLASS:
  // dayClass is a var that will be passed to className within the component return (<li ?)
  // its value is based on the result of the conditional statements below it
  // If the right side of each a conditional is true the left side will get added to the value of dayClass
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  //---------------------------------------------------------------------------------------------------------------------
  // FORMAT SPOTS FUNC:
  // this function checks the value of props.spot and runs different code based of its value
  // the function gets called in the render for the component, this is what makes the <h3> dynamic
  // EX: if the value is 0 it will place a specific string for the value of the componenets h3 output
  const formatSpots = function (spots) {
    let outputString = "";

    if (spots === 0) {
      outputString = "no spots remaining";
    } else if (spots === 1) {
      outputString = "1 spot remaining";
    } else {
      outputString = `${spots} spots remaining`;
    }

    return outputString;
  };

  //---------------------------------------------------------------------------------------------------------------------
  // RENDER

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
