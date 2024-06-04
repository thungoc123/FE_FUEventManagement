// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

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
    <Router>
      <Routes>
        <Route path="/" element={<Login1 />} />
        <Route path="/role-choosing" element={<RoleChoosing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sponsor" element={<SponsorSignUp />} />
        <Route path="/visitor" element={<VisitorSignUp />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
