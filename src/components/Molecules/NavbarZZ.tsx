import { useState } from 'react';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'

const email = window.localStorage.getItem("email");
const username = email ? email.split('@')[0] : "";

const NavbarZ = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
    
  return (
    <div style={{ width: "100%",padding: "20px 30px", display: 'flex', justifyContent: "space-between" }}>
    <Link to="/sponsor/dashboard/program/call-capital" style={{ display: 'flex', alignItems: 'center' }}>
      <FaArrowLeft style={{ marginRight: '8px' }} />
      Back
    </Link>
    {username && (
      <div style={{ position: 'relative' }}>
        <div onClick={toggleDropdown} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <FaUserCircle style={{ marginRight: '8px' }} />
          <p>{username}</p>
        </div>
        {isDropdownOpen && (
          <div style={{padding:"20px", position: 'absolute', top: '100%', right: -25, backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', zIndex: 1, border:'1px solid #ddd'}}>
            <Link to="/sponsor/dashboard" style={{ display: 'block', padding: '10px', borderBottom: '1px solid #ddd', borderTop:'1px solid #ddd' }}>
               DashBoard
            </Link>
            <Link to="/sponsor/dashboard/manage" style={{ display: 'block', padding: '10px', borderBottom: '1px solid #ddd' }}>
              Profile
            </Link>
            <Link to="/" style={{ display: 'block', padding: '10px', borderBottom: '1px solid #ddd' }}>
              Log Out
            </Link>
          </div>
        )}
      </div>
    )}
  </div>
  )
}

export default NavbarZ