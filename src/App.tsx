import { useState } from "react";

// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import HomePage from "./components/Pages/HomePage";
import EventDetail from "./components/Pages/EventDetail";

// import * as React from 'react';

import "./App.css";
import "./index.css";
// import { Login1 } from "./components/Pages/Test";
import RoleChoosing from "./components/Pages/RoleChosing";
import { SponsorSignUp } from "./components/Pages/SponsorSignUp";
import { VisitorSignUp } from "./components/Pages/VisitorSignUp";
import { OrderHistory } from "./components/Pages/OrderHistory";
import HomePageLogout from "./components/Pages/HomePageLogout";
import SurveyForm from "./components/Pages/TestforCreateSurvey";
import QuestionForm from "./components/Pages/Question";
import { ApplicationShell4 } from "./components/Pages/ApplicationShell";
import { Payment } from "./components/Pages/Payment";
import CreateEvent from "./components/Pages/CreateEvent";
import SponsorHomepage from "./components/Pages/SponsorProgramePage";
import ManageAccount from "./components/Pages/ManageAccount";
import ServiceTerm from "./components/Pages/AboutPage";
import { AddCheckStaffTable } from "./components/Organisms/Dashboard/AddCheckingStaffTable";
import { AddSponsorTable } from "./components/Organisms/Dashboard/AddSponsorTable";
import { EventScheduleTable } from "./components/Organisms/Dashboard/EventScheduleTable";
// import CreateEvent from "./components/Organisms/Dashboard/CreateEventButton";
// import Testing from "./components/Pages/Testing";
import { EventBlog } from "./components/Organisms/TestRedux/EventList";

function App() {
  const eventId='1';
  return (
    
    <>
      <Router>
        <Routes>
          <Route path="/EventDetail" element={<EventDetail eventId={eventId}/>} 
            />
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePageLogout />} />
          <Route path="/sponsor-homepage" element={<SponsorHomepage />} />
          <Route path="/Dashboard" element={<ApplicationShell4 />} />
          <Route path="/role-choosing" element={<RoleChoosing />} />
          <Route path="/sponsor" element={<SponsorSignUp />} />
          <Route path="/visitor" element={<VisitorSignUp />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/survey" element={<SurveyForm />} />
          <Route path="/question" element={<QuestionForm />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/manage" element={<ManageAccount />} />
          <Route path="/service-term" element={<ServiceTerm />} />
          <Route path="/checkstaff" element={<AddCheckStaffTable />} />
          <Route path="/sponsor-table" element={<AddSponsorTable />} />
          <Route path="/event-table" element={<EventScheduleTable />} />
          <Route path="/event/:id" element={<EventDetail/>} />


        </Routes>
      </Router>
      {/* <EventBlog /> */}
    </>
  );
}

export default App;
