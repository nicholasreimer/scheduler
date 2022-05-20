//APPLICATION COMPONENT:
//------------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "components/Appointment/index.js";
import "components/Application.scss";
import DayList from "components/DayList";
import { getAppointmentsForDay } from "helpers/selectors.js";

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
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
      }));
    });
  }, []);

  // RETURNS AN ARRAY OF APPOINTMENT OBJS FOR A GIVEN DAY COMPONENT
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  //------------------------------------------------------------------------------------------------------
  // APPLICATION COMPONENT RETURN(S):
  // -Convert appointments from an object to an array and map over that array
  // -feed that data into the Appointment component and return it to the Application Components html return/render

  const appointmentObjects = dailyAppointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
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
