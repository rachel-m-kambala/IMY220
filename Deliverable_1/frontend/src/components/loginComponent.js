//Mukaji Mweni Rachel Kambala u23559129 24
import React from 'react';
import { useState } from 'react';

function login() { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
        } catch (error) { 
            console.error('Error during login:', error);
            setMessage('Login failed. Please try again.');
        }
    }

    return (
        <form className="login-form">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
            {message && <p className="mt-4 text-sm">{message}</p>}
        </form>
    );
}

export default login;