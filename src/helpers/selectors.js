//SELECTOR HELPER FUNCTIONS:

//--------------------------------------------------------------------------------------------
// GETAPPOINTMENTSFORDAY(state, day)
//-----------------------------------
export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }

  const result = state.days.find(({ name }) => name === day);

  if (!result) {
    return [];
  }

  return result.appointments.map(
    (appointmentId) => state.appointments[appointmentId]
  );
}
//--------------------------------
// FUNC RETURN:
/* [
        { id: 1, time: '12pm', interview: null },
        { id: 2, time: '1pm', interview: null },
        {
          id: 3,
          time: '2pm',
          interview: { student: 'Archie Cohen', interviewer: 2 }
        }
      ]
*/
//--------------------------------
//STEPS:
/*
-inside the function a conditional checks if the value of the day arg is empty

-a var named result is equal to the object key within state.days that directly equals the func para day

-if the value of result is falsey return an empty array

-we map loop through state.appointments looking for values that match the values in our result.appointments array 

-we return an array of appointment objects that match var results as the funcs output
*/

//--------------------------------------------------------------------------------------------------------------
// GETAPPOINTMENTSFORDAY()
//------------------------

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const result = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };

  return result;
}

//--------------------------------
//STEPS:
/*
-inside the function a conditional checks if the value of the day arg is empty

-a var named result is equal to the object key within state.days that directly equals the func para day

-if the value of result is falsey return an empty array

-we map loop through state.appointments looking for values that match the values in our result.appointments array 

-we return an array of appointment objects that match var results as the funcs output
*/
//--------------------------------------------------------------------------------------------------------------
