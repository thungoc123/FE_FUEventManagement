// App.tsx
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import { Login1 } from "./components/Test";
// import SignUp from "./components/VisitorSignUp";

import { Button, Input, Label } from "@relume_io/relume-ui";
import RoleChoosing from "./components/RoleChosing";
import { SponsorSignUp } from "./components/SponsorSignUp";
import { VisitorSignUp } from "./components/VisitorSignUp";

const Home = () => <h1>Home Page</h1>;



  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login1 />} />
        <Route path="/role-choosing" element={<RoleChoosing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sponsor" element={<SponsorSignUp />} />
        <Route path="/visitor" element={<VisitorSignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
