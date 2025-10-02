//Mukaji Mweni Rachel Kambala u23559129 24

import React from "react";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";

const Splash = () => (
  <main>
    <h1>Welcome to CodeSync</h1>
    <section>
      <h2>Login</h2>
      <LoginForm />
    </section>
    <section>
      <h2>Sign Up</h2>
      <SignUpForm />
    </section>
  </main>
);

export default Splash;