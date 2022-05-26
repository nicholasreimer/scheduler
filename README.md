# Interview Scheduler

Interview Scheduler is a Single Page Application that gives users the ability to book, edit and cancel interviews in a streamlined and intuitive package. The application is built on top of React, with a full suite of custom components and unique purpose built Hooks. The data that is fed into the project is from a linked API server using a well suited PSQL database. Lastly and most imoprtantly the project has been aggressively tested from the start, utilizing the latest available software inculding story book, cypress and more.

Project Features:
-Interviews can be booked between Monday and Friday in any of the available listed time-slots
-Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
-A user can cancel an existing interview or edit the details of an existing interview.
-The expected day updates the number of spots available when an interview is booked or canceled.
-The application makes API requests to load and persist data. Data is not lost after a browser refresh.

Tech Specs:
-React
-Webpack, Babel
-Axios, WebSockets
-Axios
-Storybook, Webpack Dev Server, Jest, Testing Library

The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

Screenshots of the project:

!["Home Page:"](https://github.com/nicholasreimer/scheduler/blob/master/Screenshots/HomeScreen.png)

!["Add an Appointment:"](https://github.com/nicholasreimer/scheduler/blob/master/Screenshots/createAppointment.png?raw=true)
