//Mukaji Mweni Rachel Kambala u23559129 24
import React from 'react';

function signupForm() {
    return (
        <form className="sigmup-form">
            <input type="text" placeholder="Username" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default signupForm;