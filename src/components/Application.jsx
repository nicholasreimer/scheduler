// APPLICATION COMPONENT:
//---------------------------------------------------------------------------------------------------------
import React from "react";
import "components/Application.scss";

import Appointment from "components/Appointment/index.jsx";
import DayList from "components/DayList";
import useApplicationData from "hooks/useApplicationData";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors.js";

//-------------------------------------------------------------------------------------------------------
// APPLICATION COMPONENT DECLERATION:
//------------------------------------
export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  //------------------------------------------------------------------------------------------------------
  // APPLICATION COMPONENT RETURN:

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // calls a function that returns an array of appointment objects for a given day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // we map through the array of objects and use the data to create a bunch of Appointment components
  const appointmentObjects = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    //RENDER
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
