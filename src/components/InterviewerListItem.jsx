// INTERVIEWER LIST ITEM - COMPONENT FILE:
//----------------------------------------------------------------------------------------------------------
//IMPORTS:
import React from "react";

import "components/InterviewerListItem.scss";
import classNames from "classnames";
//----------------------------------------------------------------------------------------------------------
//PROPS THAT WILL BE PASSED TO COMPONENT:

// 1.) SINGLE OBJECT: const interviewer = {
//                    id: 1,
//                    name: "Sylvia Palmer",
//                    avatar: "https://i.imgur.com/LpaY82x.png",
//                    };

// 2.) SELECTED: BOOLEAN - determines if an interviewer is selected or not and displays the name and
//applies appropriate styles if selected.

// 3.) FUNCTION: setInterviewer - is run when the <InterviewerListItem> is clicked.
// This function receives the interviewer's id as an argument. It sets the selected interviewer.

//----------------------------------------------------------------------------------------------------------
//COMPONENT DECLARATION:

export default function InterviewerListItem(props) {
  // If PROP #2 evaluates "truthy" add this class to the className for the InterviewListItem
  // This will trigger the scss styling that shows the component has been selected
  const InterviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  // JSX RETURN/ RENDER
  return (
    <li
      key={props.id}
      className={InterviewerListItemClass}
      onClick={() => props.setInterviewer(props.id)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name : ""}
    </li>
  );
}
