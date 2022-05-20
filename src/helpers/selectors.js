//SELECTOR HELPER FUNCTIONS:

//------------------------------------------------------------------------------------
// GET AN ARRAY OF APPOINTMENT OBJS FOR A GIVEN DAY COMPONENT
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

//STEPS:
/*
-inside the function a conditional checks if the value of the day arg is empty

-a var named result is equal to the object key within state.days that directly equals the func para day

-if the value of result is falsey return an empty array

-we map loop through state.appointments looking for values that match the values in our result.appointments array 

-we return an array of appointment objects that match var results as the funcs output
*/
//--------------------------------------------------------------------------------------------------------------
