//Mukaji Mweni Rachel Kambala u23559129 24
import React from "react";
import { Link } from "react-router-dom";
// import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Welcome back, @DevGenericName</h2>
      <nav>
        <ul className="sidebar-menu">
          <li>
            <Link to="/home" className="sidebar-link">Home</Link>
          </li>
          <li>
            <Link to="/profile/1" className="sidebar-link">Profile</Link>
          </li>
          <li>
            <Link to="/project/1" className="sidebar-link">Projects</Link>
          </li>
          <li>
            <Link to="/login" className="sidebar-link logout">Log out</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;