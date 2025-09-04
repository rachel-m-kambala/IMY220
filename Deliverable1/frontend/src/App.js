//Mukaji Mweni Rachel Kambala u23559129 24
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from './pages/splashPage.js';
import Home from './pages/home.js';
import Profile from './pages/profile.js';
import Project from './pages/project.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/project/:id" element={<Project />} />
      </Routes>
    </Router>
  );
}

export default App;