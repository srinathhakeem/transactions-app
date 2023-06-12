import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [userId, setUserId] = useState('');

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(userId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User ID:
        <input type="text" value={userId} onChange={handleUserIdChange} />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
