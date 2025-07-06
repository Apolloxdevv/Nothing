import React, { useState, useEffect } from 'react';

const containerStyle = {
  maxWidth: '600px',
  margin: '2rem auto',
  padding: '1rem',
};

const userInfoStyle = {
  backgroundColor: '#1e1e1e',
  padding: '1rem',
  borderRadius: '8px',
  marginBottom: '2rem',
  textAlign: 'center',
};

const friendsContainerStyle = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const friendCircleStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: '#333',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  cursor: 'default',
  flexDirection: 'column',
  color: '#ccc',
  fontSize: '0.8rem',
};

const avatarImgStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '0.3rem',
};

const friendNameStyle = {
  overflowWrap: 'break-word',
  textAlign: 'center',
};

const sampleAvatars = [
  'https://i.pravatar.cc/60?img=10',
  'https://i.pravatar.cc/60?img=20',
  'https://i.pravatar.cc/60?img=30',
  'https://i.pravatar.cc/60?img=40',
  'https://i.pravatar.cc/60?img=50',
];

function Profile({ user }) {
  const [friends, setFriends] = useState([]);

  // Load friends from localStorage users data
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('myroblox_users') || '{}');
    if (users[user.username]?.friends) {
      setFriends(users[user.username].friends);
    } else {
      setFriends([]);
    }
  }, [user.username]);

  // For demo, add a friend (random from sample) on click
  const addRandomFriend = () => {
    const users = JSON.parse(localStorage.getItem('myroblox_users') || '{}');
    let newFriendName = `Friend${Math.floor(Math.random() * 1000)}`;
    // Avoid duplicates
    while (friends.includes(newFriendName)) {
      newFriendName = `Friend${Math.floor(Math.random() * 1000)}`;
    }
    const newFriends = [...friends, newFriendName];
    users[user.username].friends = newFriends;
    localStorage.setItem('myroblox_users', JSON.stringify(users));
    setFriends(newFriends);
  };

  return (
    <div style={containerStyle}>
      <section style={userInfoStyle}>
        <h2>{user.username}</h2>
        <div>Welcome to your profile page.</div>
        <button
          onClick={addRandomFriend}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#2a8df4',
            color: 'white',
            cursor: 'pointer',
          }}
          title="Add a random friend"
        >
          Add Random Friend
        </button>
      </section>
      <section>
        <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Friends</h3>
        <div style={friendsContainerStyle}>
          {friends.length === 0 && <div style={{ color: '#777' }}>You have no friends yet.</div>}
          {friends.map((friend, i) => (
            <div key={friend} style={friendCircleStyle} title={friend}>
              <img
                src={sampleAvatars[i % sampleAvatars.length]}
                alt={`${friend} avatar`}
                style={avatarImgStyle}
              />
              <div style={friendNameStyle}>{friend}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Profile;
