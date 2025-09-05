//Mukaji Mweni Rachel Kambala u23559129 24

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function loginComponent({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    if (!email.includes('@')) return 'Email must contain @';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (onLogin) onLogin(data);

      navigate('/home'); 
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={e => setPassword(e.target.value)}
      />
      <span className="forgot">Forgot password?</span>
      <button type="submit">Log In</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}

export default loginComponent;