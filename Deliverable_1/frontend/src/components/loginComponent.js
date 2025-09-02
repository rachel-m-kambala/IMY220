//Mukaji Mweni Rachel Kambala u23559129 24
import React from 'react';

function loginForm() {
    return (
        <form className="login-form">
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
}

export default loginForm;