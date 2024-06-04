import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import HomePage from "./components/Pages/HomePage";
import DesignTesting from "./components/Pages/DesignTesting";
import EventDetail from "./components/Pages/EventDetail";
import { Layout28 } from "./components/Organisms/Guest/EventScheduleDetail";

// import * as React from 'react';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/EventDetail" element={<EventDetail />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/EventScheduleDetail" element={<Layout28 /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
