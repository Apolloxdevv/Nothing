import React, { useState, useEffect } from 'react';
import LoginSignup from './LoginSignup';
import Profile from './Profile';

const darkStyle = {
  backgroundColor: '#121212',
  color: '#eee',
  minHeight: '100vh',
  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
};

const headerStyle = {
  padding: '1rem',
  borderBottom: '1px solid #333',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const logoStyle = {
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: '#2a8df4',
  cursor: 'default',
  userSelect: 'none',
};

function App() {
  const [user, setUser] = useState(null);

  // Load logged in user on mount
  useEffect(() => {
    const logged = localStorage.getItem('loggedInUser');
    if (logged) setUser(JSON.parse(logged));
  }, []);

  const handleLogin = (username) => {
    setUser({ username });
    localStorage.setItem('loggedInUser', JSON.stringify({ username }));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <div style={darkStyle}>
      <header style={headerStyle}>
        <div style={logoStyle}>MyRoblox</div>
        {user && (
          <button
            onClick={handleLogout}
            style={{
              marginLeft: 'auto',
              padding: '0.4rem 0.8rem',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: '#2a8df4',
              color: 'white',
              fontWeight: '600',
            }}
          >
            Logout
          </button>
        )}
      </header>
      <main>{user ? <Profile user={user} /> : <LoginSignup onLogin={handleLogin} />}</main>
    </div>
  );
}

export default App;
