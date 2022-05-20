//APPLICATION COMPONENT:
//------------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import axios from "axios";

import Appointment from "components/Appointment/index.js";
import "components/Application.scss";
import DayList from "components/DayList";

//------------------------------------------------------------------------------------
// COMPONENT TEST DATA: it gets fed into the corresponding components
const appointments = {
  1: {
    id: 1,
    time: "12pm",
  },
  2: {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  3: {
    id: 3,
    time: "2pm",
  },
  4: {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      },
    },
  },
  5: {
    id: 5,
    time: "4pm",
  },
};

//-------------------------------------------------------------------------------------------------------
// COMPONENT DECLERATION:
export default function Application(props) {
  //------------------------------------------------------------------------------------------------------
  // GET DAY API DATA: (made possible by the react hook useEffect)
  // -an axios get request returns data from an api that we use to update the state of var days
  // -the request is run whenever the state of day is changed, which happens via the DayListItem component
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/api/days`).then((response) => {
      setDays(response.data);
    });
  }, [day]);

  //------------------------------------------------------------------------------------------------------
  // -Convert appointments from an object to an array and map over that array
  // -feed that data into the Appointment component and return it to the Application Components html return/render
  const appointmentList = Object.values(appointments).map((appointment) => {
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
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
