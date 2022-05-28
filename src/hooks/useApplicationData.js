// USE APPLICATION DATA - HOOK
//---------------------------------------------------------------------------------------------------------
// IMPORTS:
import { useEffect, useState } from "react";
import axios from "axios";

//---------------------------------------------------------------------------------------------------------

export default function useApplicationData(initial) {
  //--------------------------------------------------
  // STATE:
  // -We have bundled multiiple states into a single object, this allows us to add states/ change states efficiently
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //----------------------------------------------------
  // SET DAY:
  // -Thought Process: "setState on its own is too powerfull so instead i will just give you this setDay since thats all u need"
  // -the setDay func takes in "day" and uses setState to update the value of "day" on the state object
  const setDay = (day) => setState({ ...state, day });

  //------------------------------------------------------------------------------------------------------
  //USE-EFFFECT API REQUEST: GET DAYS DATA + GET APPOINTMENTS DATA
  //---------------------------------------------------------------
  // -we use the react useEffect hook to make 3 get requests to our api that are bundled in a Promise.all
  // -when successfull Promise.all returns an array containing the resulting data from the 2 seperate requests
  // -within the promises .then we call setState. We use the spread operator to copy the exsisiting values of
  //  days state and appointments state and replace the parts that are different with the data from our api get request
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"), //returns an array of individual day objects
      axios.get("/api/appointments"), //returns an object of individual interview objects
      axios.get("/api/interviewers"), //returns an object of individual interviewER objects
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
    // A single set of [] as the useEffects 2nd arg means this will run once on initial render
  }, []);

  //------------------------------------------------------------------------------------------------------
  // BOOK INTERVIEW:
  // -bookInterview makes an HTTP request and updates the local state.
  // -This function was called by the save func within index.jsx (go there for more notes on how it works)
  // -it logs the values of id and interview

  function bookInterview(id, interview) {
    // -we create a new appoinment obj and use the values from the existing appointments state.
    // -We replace the current value of the interview key with the new value our function contains
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
      .put(`/api/appointments/${id}`, {
        interview,
      })
      .then(() => {
        // -now that we have our object ready and our promise has resolved we pass it into setState to
        //  update the values of the state obj accordingly.
        setState({
          ...state,
          appointments,
          days: updateSpots(id, state, "BOOK"),
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

    return (
      axios
        .delete(`/api/appointments/${id}`, {
          appointment,
        })
        // -If the promise is resolved, use setState to update the values of the appointments state and call
        //  the updateSpots function inside of the day state to render its value based of the most current version of state
        .then(() => {
          setState({
            ...state,
            appointments,
            days: updateSpots(id, state, "CANCEL"),
          });
        })
    );
  }

  //------------------------------------------------------------------------------------------------------
  // UPDATE SPOTS:
  // -this fucntion is called in the .then of both the cancelInterview and the bookInterview functions
  // -the function returns an array as the result of mapping state.days
  // -as each day is mapped if the arg id matches the id within the day object AND the action arg is "CANCEL"
  //  add 1 to the number value of day.spots for that specific day.
  // -if the action is not equal then minus 1 from the value of day.spots

  function updateSpots(id, state, action) {
    // -if the state of interview is falsey it will be kept false by the !! operator and can
    //  then be used to make sure day.spots value does not change.
    // -keeping the value false makes it easy to write the conditional in a boolean style that guarantees
    //  if u edit an exsisiting appt u will not change day.spots
    const isEditingAppointment = !!state.appointments[id].interview;

    return state.days.map((day) => {
      if (day.appointments.includes(id)) {
        if (isEditingAppointment) {
          return day;
        }
      } else if (action === "CANCEL") {
        day.spots++;
      } else if (day.spots > 0) {
        day.spots--;
      }
      return day;
    });
  }

  //------------------------------------------------------------------------------------------------------
  //HOOK RETURN: returns an object with four keys:
  return { state, setDay, bookInterview, cancelInterview };
}
