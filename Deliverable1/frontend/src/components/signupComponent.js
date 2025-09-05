//Mukaji Mweni Rachel Kambala u23559129 24
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupComponent({ onSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
    const navigate = useNavigate();

  const validate = () => {
    if (!email.includes('@')) return 'Email must contain @';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (password !== repeatPassword) return 'Passwords do not match';
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
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (onSignup) onSignup(data);

      navigate('/home'); 
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
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
      <input
        type="password"
        placeholder="Repeat Password"
        value={repeatPassword}
        required
        onChange={e => setRepeatPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}

export default SignupComponent;