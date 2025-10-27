//Mukaji Mweni Rachel Kambala u23559129 24

import React from "react";
import LoginForm from "../components/auth/loginForm";
import SignUpForm from "../components/auth/signupForm";
import { useState } from "react";

const Splash = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="splash">
      <h1>CodeSync</h1>
      <p>CODE. SYNC. REPEAT.</p>

      <div className="auth-toggle">
        <button
          className={showLogin ? "active" : ""}
          onClick={() => setShowLogin(true)}
        >
          Log In
        </button>
        <button
          className={!showLogin ? "active" : ""}
          onClick={() => setShowLogin(false)}
        >
          Sign Up
        </button>
      </div>

      {showLogin ? <LoginForm /> : <SignUpForm />}
    </div>
  );
};

export default Splash;