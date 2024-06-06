import React, { useState } from 'react'
import Sidebar from './Sidebar';
import {
    FaHome,
    FaTachometerAlt,
    FaChartLine,
    FaFileAlt,
    FaCube,
    FaQuestionCircle,
    FaCog,
  } from "react-icons/fa";
  
function SidebarResponsive() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const sidebarItems = [
    {title: 'Home', icon: FaHome},
      { title: 'Dashboard', submenu: [{ name: 'Event', icon:FaChartLine , submenu: [, { name: 'Event Attendance', icon:FaQuestionCircle }] }, { name: 'Survey Analytics',icon:FaChartLine},{ name: 'Historical', icon:FaCube}], icon: FaTachometerAlt},
      { title: 'Projects', icon: FaFileAlt },
      { title: 'Trash' , icon: FaCog},
    ];
  
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
    return (
      <div className="flex">
        <Sidebar items={sidebarItems} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-grow p-6 lg:ml-64">
          <button
            className="lg:hidden bg-gray-900 text-white px-4 py-2 rounded-md"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
          </button>
          <h1 className="text-2xl font-bold">Main Content</h1>
        </div>
      </div>
    );
  };

export default SidebarResponsive