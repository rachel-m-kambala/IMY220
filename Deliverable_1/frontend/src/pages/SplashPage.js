//Mukaji Mweni Rachel Kambala u23559129 24
import React from 'react';
import loginForm from '../components/loginComponent';
import signupForm from '../components/signupComponent';
import logo from '../components/logoComponent';

function splashPage() {
    return (
        <div className="hero">
            {logo()}
            <h1>CodeSync</h1>
            <h2>Code. Sync. Repeat.</h2>
        </div>
    );
}