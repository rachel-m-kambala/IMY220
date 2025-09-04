//Mukaji Mweni Rachel Kambala u23559129 24
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginComponent from '../components/loginComponent';
import logo from '../../public/assets/images/logo.png';
import '../css/loginPage.css';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-bg">
      <div className="login-sidebar">
        <div className="login-sidebar-content">
          <button className="login-tab active">LOGIN</button>
          <button className="login-tab" onClick={() => navigate('/signup')}>SIGN UP</button>
        </div>
      </div>
      <div className="login-main">
        <img src={logo} alt="Logo" className="login-logo" />
        <h1 className="login-title">WELCOME BACK, DEV!</h1>
        <LoginComponent />
      </div>
    </div>
  );
}

export default Login;