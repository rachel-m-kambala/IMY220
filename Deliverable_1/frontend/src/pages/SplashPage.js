//Mukaji Mweni Rachel Kambala u23559129 24
import React from 'react';
import logo from '../components/logoComponent';
import splashPageButton from './splashPageButton';

function splashPage() {
    return (
        <div className="hero">
            {logo()}
            <h1>CodeSync</h1>
            <h2>Code. Sync. Repeat.</h2>
            <div className="button-group">
                <div className="signup">
                    <p>Your main branch is waiting.</p>
                    {splashPageButton({ text: "Sign Up", to: "/signup", outline: false })}
                </div>
                <div className="login">
                    <p>Ready to commit?</p>
                    {splashPageButton({ text: "Login", to: "/login", outline: true })}
                </div>
            </div>
        </div>
    );
}