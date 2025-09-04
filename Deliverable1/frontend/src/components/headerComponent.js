//Mukaji Mweni Rachel Kambala u23559129 24
import React from 'react';
import { Link } from 'react-router-dom';

function headerComponent() {
  return (
    <nav>
      <Link to="/home">Home</Link> |{' '}
      <Link to="/profile/1">Profile</Link> |{' '}
      <Link to="/project/1">Project</Link>
    </nav>
  );
}

export default headerComponent;