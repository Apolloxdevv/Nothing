import React, { useState } from 'react';

const containerStyle = {
  maxWidth: '360px',
  margin: '3rem auto',
  backgroundColor: '#1e1e1e',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.7)',
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  marginBottom: '1rem',
  borderRadius: '4px',
  border: 'none',
  fontSize: '1rem',
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#2a8df4',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
};

const toggleStyle = {
  marginTop: '1rem',
  textAlign: 'center',
  cursor: 'pointer',
  color: '#6ab4f8',
  userSelect: 'none',
};

function LoginSignup({ onLogin }) {
  const [mode, setMode] = useState('login'); // or 'signup'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const usersKey = 'myroblox_users';

  const loadUsers = () => JSON.parse(localStorage.getItem(usersKey) || '{}');
  const saveUsers = (users) => localStorage.setItem(usersKey, JSON.stringify(users));

  const handleSignup = () => {
    setError('');
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    const users = loadUsers();
    if (users[username]) {
      setError('Username already taken');
      return;
    }
    users[username] = { password, friends: [] };
    saveUsers(users);
    onLogin(username);
  };

  const handleLogin = () => {
    setError('');
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    const users = loadUsers();
    if (!users[username] || users[username].password !== password) {
      setError('Invalid username or password');
      return;
    }
    onLogin(username);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    mode === 'login' ? handleLogin() : handleSignup();
  };

  return (
    <form style={containerStyle} onSubmit={onSubmit}>
      <h2 style={{ marginBottom: '1rem' }}>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      <input
        style={inputStyle}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value.trim())}
        autoComplete="username"
      />
      <input
        style={inputStyle}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
      />
      {error && <div style={{ color: 'tomato', marginBottom: '1rem' }}>{error}</div>}
      <button type="submit" style={buttonStyle}>
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </button>
      <div
        style={toggleStyle}
        onClick={() => {
          setError('');
          setUsername('');
          setPassword('');
          setMode(mode === 'login' ? 'signup' : 'login');
        }}
      >
        {mode === 'login' ? 'Create an account' : 'Already have an account? Login'}
      </div>
    </form>
  );
}

export default LoginSignup;
