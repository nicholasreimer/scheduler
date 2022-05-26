// INTERVIEWER LIST  - COMPONENT (LIST OF INTERVIEWER LIST ITEMS)
//----------------------------------------------------------------------------------------------------------
//IMPORTS:
import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

//----------------------------------------------------------------------------------------------------------
//PROPS THAT WILL BE PASSED TO COMPONENT:

// 1.) ARRAY OF INTERVIEWER OBJECTS:
//     const interviewers = [
//     { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//     { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },     ];

// 2.) setInterviewer: FUNCTION - a function that accepts an interviewer id.
//     This function will be passed down to the <InterviewerListItem>

// 3.) INTERVIEWER: NUMBER - number that represents the id of the currently selected interviewer

//----------------------------------------------------------------------------------------------------------
// INTERVIEWER LIST:
export default function InterviewerList(props) {
  const listItem = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  //----------------------------------------------------------------------------------------------------------
  //RENDER:
  //component will return an array of <InterviewerListItem> components.
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listItem}</ul>
    </section>
  );
}
