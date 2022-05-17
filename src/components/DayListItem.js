// DAY LIST ITEM - COMPONENT FILE:
//----------------------------------------------------------------------------------------------------------
//IMPORTS:
import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";
//---------------------------------------------------------------------------------------------------------------------
//COMPONENT DECLARATION:

export default function DayListItem(props) {
  // dayClass is a var that will be passed to className within the component return (<li ?)
  // its value is based on the result of the conditional statements below it
  // If the right side of each a conditional is true the left side will get added to the value of dayClass
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spot === 0,
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}
