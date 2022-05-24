// USE APPLICATION DATA - HOOK
//---------------------------------------------------------------------------------------------------------
import { useEffect, useState } from "react";
import axios from "axios";

//---------------------------------------------------------------------------------------------------------

export default function useApplicationData(initial) {
  //------------------------------------------------------------------------------------------------------
  // STATE:
  //We have bundled multiiple states into a single object, this allows us to add states/ change states efficiently
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //------------------------------------------------------------------------------------------------------
  // SET DAY:
  // -the setDay func takes in "day" and uses setState to update the value of "day" on the state object
  const setDay = (day) => setState({ ...state, day });

  //------------------------------------------------------------------------------------------------------
  // BOOK INTERVIEW:
  // -The bookInterview action makes an HTTP request and updates the local state.
  // -This function was called by the save func within index.jsx (go ther for more notes on how it works)
  // -it logs the values of id and interview

  function bookInterview(id, interview) {
    //-we create a new appoinment obj and make values for it that are copied from the existing appointments state.
    //-We replace the current value of the interview key with the new value our function contains
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // -we create a new appoinmentS obj and use the update pattern from above to replace the existing record with
    //  the correct matching id.
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // -we return a PUT request to the /api/appointments/:id endpoint as a promise to update the database with
    //  the new data from above so that when the browser refreshes, the data is persistent.
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {
        interview,
      })
      .then(() => {
        // -now that we have our object ready and our promise has resolved we pass it into setState to update the values of the state obj
        setState({
          ...state,
          appointments,
        });
      });
  }

  //------------------------------------------------------------------------------------------------------
  // CANCEL INTERVIEW FUNC:
  // -this function is called by the onDeleteAppointment() within index.jsx and triggers an axios that deletes the appropriate
  //  entry in the db, once that resolves the state for the app is updated to match
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, {
        appointment,
      })
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      });
  }

  //------------------------------------------------------------------------------------------------------

  //HOOK RETURNS: returns an object with four keys:
  return { state, setDay, setState, bookInterview, cancelInterview };
}
