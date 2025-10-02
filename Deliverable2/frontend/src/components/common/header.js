//Mukaji Mweni Rachel Kambala u23559129 position-24

import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <nav>
    <ul>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/projects/1">Projects</Link></li>
      <li><Link to="/profile/1">Profile</Link></li>
    </ul>
  </nav>
);

export default Header;
