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
// import HomePage from "./components/Pages/HomePage";
// import EventDetail from "./components/Pages/EventDetail";

// import * as React from 'react';

import "./App.css";
import "./index.css";
import RoleChoosing from "./components/Pages/Guest/RoleChosing";
import QuestionForm from "./components/Pages/Dashboard/EventOperator/Question";
import SponsorHomepage from "./components/Pages/Guest/SponsorProgramePage";
import { AddCheckStaffTable } from "./components/Organisms/Dashboard/AddCheckingStaffTable";
import { AddSponsorTable } from "./components/Organisms/Dashboard/AddSponsorTable";
import { EventScheduleTable } from "./components/Organisms/Dashboard/EventScheduleTable";
import { Program } from "./components/Pages/Dashboard/Sponsor/Program";
import { AddProgram } from "./components/Pages/Dashboard/Sponsor/CreateProgram";
import { QuestionAnalyticsDashboard } from "./components/Pages/Dashboard/QuestionAnalyticsDashboard";
import { AnalyticsDashboard } from "./components/Pages/Dashboard/AnalyticsDashboard";
import { EO } from "./components/Pages/Dashboard/EventOperator/EO";
import HomePageLogout from "./components/Pages/Guest/HomePageLogout";
import { SponsorSignUp } from "./components/Pages/Guest/SponsorSignUp";
import { VisitorSignUp } from "./components/Pages/Guest/VisitorSignUp";
import { OrderHistory } from "./components/Pages/Visitor/OrderHistory";
import SurveyForm from "./components/Pages/Dashboard/TestforCreateSurvey";
import CreateEvent from "./components/Pages/Dashboard/EventOperator/CreateEvent";
import ManageAccount from "./components/Pages/Dashboard/Sponsor/ManageAccount";
import ServiceTerm from "./components/Pages/Guest/AboutPage";
import { Payment } from "./components/Pages/Visitor/Payment";
import HomePage from "./components/Pages/Guest/HomePage";
import EventDetail from "./components/Pages/Guest/EventDetail";
import { ManageFeedbackDetail } from "./components/Pages/Dashboard/EventOperator/ManageFeedbackDetail";
import { ManageFeedback } from "./components/Pages/Dashboard/EventOperator/ManageFeedback";
import Stepper from "./components/Molecules/Stepper";
// import Modal from "./components/Organisms/Guest/Modal";
import ReactModal from "react-modal";

function App() {
  ReactModal.setAppElement('#root');

  return (
    <>
      <Router>
        <Routes>
          <Route path="/EventDetail" element={<EventDetail />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePageLogout />} />
          <Route path="/sponsor-homepage" element={<SponsorHomepage />} />
          <Route path="/role-choosing" element={<RoleChoosing />} />
          <Route path="/Dashboard" element={<AnalyticsDashboard />} />
          <Route
            path="/Dashboard/Question"
            element={<QuestionAnalyticsDashboard />}
          />
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
          <Route path="/Sponsor/Program" element={<Program />} />
          <Route path="/Sponsor/Program/Create" element={<AddProgram />} />
          <Route path="/dashboard/event" element={<EO />} />
          <Route path="/dashboard/feedback" element={<ManageFeedback />} />
          <Route path="/dashboard/FeedbackDetail" element={<ManageFeedbackDetail />} />
          <Route path="/test" element= {<Stepper />} />
        </Routes>
      </Router>
      {/* <EventBlog /> */}
    </>
  );
}

export default App;
