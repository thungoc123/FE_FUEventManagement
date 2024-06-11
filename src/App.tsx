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
import DesignTesting from "./components/Pages/DesignTesting";
import EventDetail from "./components/Pages/EventDetail";
import { Layout28 } from "./components/Organisms/Guest/EventScheduleDetail";

// import * as React from 'react';

import "./App.css";
import "./index.css";
import { Login1 } from "./components/Pages/Test";
import RoleChoosing from "./components/Pages/RoleChosing";
import { SponsorSignUp } from "./components/Pages/SponsorSignUp";
import { VisitorSignUp } from "./components/Pages/VisitorSignUp";
import { Payment } from "./components/Pages/Payment";
import { OrderHistory } from "./components/Pages/OrderHistory";
import HomePageLogout from "./components/Pages/HomePageLogout";
import SurveyForm from "./components/Pages/TestforCreateSurvey";
import QuestionForm from "./components/Pages/Question";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/EventDetail" element={<EventDetail />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePageLogout />} />

          <Route path="/login" element={<Login1 />} />

          <Route path="/EventScheduleDetail" element={<Layout28 />} />
          <Route path="/role-choosing" element={<RoleChoosing />} />
          <Route path="/sponsor" element={<SponsorSignUp />} />
          <Route path="/visitor" element={<VisitorSignUp />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/survey" element={<SurveyForm />} />
          <Route path="/question" element={<QuestionForm />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
