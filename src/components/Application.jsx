//APPLICATION COMPONENT:
//------------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "components/Appointment/index.js";
import "components/Application.scss";
import DayList from "components/DayList";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors.js";

//-------------------------------------------------------------------------------------------------------
// COMPONENT DECLERATION:
export default function Application(props) {
  //------------------------------------------------------------------------------------------------------
  // STATE:
  //We have bundled multiiple states into a single object, this allows us to add states efficiently
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
  // -we use the react useEffect hook to make 2 api get requests at the same time by using Promise.all
  // -when successfull Promise.all returns an array containing the resulting data from the 2 seperate requests
  // -within the promises .then we call setState. We use the spread operator to copy the exsisiting values of
  //  days state and appointments state and replace the parts of that are different.
  //  ?? WHY IS SPREAD NECCESAARY IN THIS COPNTEXT ??
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
