//Mukaji Mweni Rachel Kambala u23559129 24
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginComponent from '../components/loginComponent';
import SignupComponent from '../components/signupComponent';
import logo from '../../public/assets/images/logo.png'
import '../css/splashPage.css';

function splashPage() {
    const navigate = useNavigate();

  return (
    <div className="splash-bg">
      <div className="splash-container">
              <div className="splash-logo">{logo()}</div>
        <div className="splash-title">CODESYNC</div>
        <div className="splash-subtitle">CODE. SYNC. REPEAT.</div>
        <div className="splash-btn-row">
          <div className="splash-btn-box">
            <p>Your main branch is waiting.</p>
            <button className="splash-btn" onClick={() => navigate('/signup')}>
                Sign Up
            </button>
          </div>
          <div className="splash-btn-box">
            <p>Ready to commit?</p>
                      <button className="splash-btn" onClick={() => navigate('/login')}>
                          Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default splashPage;