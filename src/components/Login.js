import React, { useState } from "react";
import { saveUsername, getUsername } from "../utils/localStorage";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState(getUsername());
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      saveUsername(username.trim());
      onLogin(username.trim());
    } else {
      setTouched(true);
    }
  };

  return (
    <div className="login-outer">
      <div className="login-card animate-in">
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-subtitle">Sign in to your personal task tracker</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => setTouched(true)}
            className={touched && !username.trim() ? "input-error" : ""}
            autoFocus
          />
          {touched && !username.trim() && (
            <div className="login-error">Username is required</div>
          )}
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
