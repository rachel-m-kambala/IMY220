//Mukaji Mweni Rachel Kambala u23559129 24
import React from 'react';
import { useState } from 'react';

function signUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            setMessage(data.message);

            localStorage.setItem('user', JSON.stringify(data.user));
        } catch (error) { 
            console.error('Error during signup:', error);
            setMessage('Signup failed. Please try again.');
        }
    }

    return (
        <form className="sigmup-form">
            <input type="text" placeholder="Username" required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Sign Up</button>
            {message && <p className="mt-4 text-sm">{message}</p>}
        </form>
    );
}

export default signUp;