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
import { Login1 } from "./components/Test";
import RoleChoosing from "./components/RoleChosing";
import { SponsorSignUp } from "./components/SponsorSignUp";
import { VisitorSignUp } from "./components/VisitorSignUp";
import { Test } from "./Test/DesignTest";

const Home = () => <h1>Home Page</h1>;
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/EventDetail" element={<EventDetail />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/EventScheduleDetail" element={<Layout28 /> } />
           <Route path="/role-choosing" element={<RoleChoosing />} />
        <Route path="/sponsor" element={<SponsorSignUp />} />
        <Route path="/visitor" element={<VisitorSignUp />} />
        <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
