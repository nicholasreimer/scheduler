// APPLICATION COMPONENT:
//---------------------------------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import axios from "axios";

import Appointment from "components/Appointment/index.jsx";
import "components/Application.scss";
import DayList from "components/DayList";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors.js";

//-------------------------------------------------------------------------------------------------------
// APPLICATION COMPONENT DECLERATION:
//----------------------------------------------------------------------------------------------------------
export default function Application(props) {
  // STATE:
  //We have bundled multiiple states into a single object, this allows us to add states/ change states efficiently
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // -these represent helper functions for the states within the state object
  // -the setDay func takes in "day" and uses setState to update the value of "day" on the state object
  const setDay = (day) => setState({ ...state, day });

  //------------------------------------------------------------------------------------------------------
  //USE-EFFFECT API REQUEST: GET DAYS DATA + GET APPOINTMENTS DATA
  //---------------------------------------------------------------
  // -we use the react useEffect hook to make 3 get requests to our api we use a bundled Promise.all to run them together
  // -when successfull Promise.all returns an array containing the resulting data from the 2 seperate requests
  // -within the promises .then we call setState. We use the spread operator to copy the exsisiting values of
  //  days state and appointments state and replace the parts of that are different with the data from our api get request
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"), //returns an array of individual day objects
      axios.get("http://localhost:8001/api/appointments"), //returns an object of individual interview objects
      axios.get("http://localhost:8001/api/interviewers"), //returns an object of individual interviewER objects
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //------------------------------------------------------------------------------------------------------
  // BOOKINTERVIEW FUNC:
  //-This function was called by the save func within index.jsx (go ther for more notes on how it works)
  //-we log the values of id and interview

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
  // DELETE INTERVIEW FUNC:
  // -this function is called by the onDeleteAppointment() and triggers an axios that deletes the appropriate
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
  // APPLICATION COMPONENT RETURN:

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // calls a function that returns an array of appointment objects for a given day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // we map through the array of objects and use the data to create a bunch of Appointment components
  const appointmentObjects = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentObjects}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
