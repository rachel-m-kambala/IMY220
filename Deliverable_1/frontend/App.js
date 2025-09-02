//Mukaji Mweni Rachel Kambala u23559129 24
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import splashPage from './pages/SplashPage';
import loginPage from './pages/LoginPage';
import signupPage from './pages/SignupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={splashPage()} />
        <Route path="/login" element={loginPage()} />
        <Route path="/signup" element={signupPage()} />
      </Routes>
    </Router>
  );
}