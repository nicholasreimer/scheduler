// DAY LIST - COMPONENT FILE:
//----------------------------------------------------------------------------------------------------------
//IMPORTS:
import React from "react";
import DayListItem from "components/DayListItem";

//----------------------------------------------------------------------------------------------------------
//COMPONENT DECLARATION:

export default function DayList(props) {
  const days = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{days}</ul>;
}

// MISSING SETDAY ACTION! LINE 13

/* STEPS:
-var named days is the result of mapping the days array

-for each day object a new DayListItem is generated that contains dynamic values for its atttributes 
 based on that loops days object value

-once we have generated all the DayListItems we return them as the components output by referencing the day var within 
 a ul element

-u can kind of think of the end return as being a call to start the code at line 11 - (be carefull how u interpret this)

*/
