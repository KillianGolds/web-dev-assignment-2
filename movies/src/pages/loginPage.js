import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";

// This component renders the login page
const LoginPage = props => {
  const context = useContext(AuthContext); // Get the AuthContext
  const [userName, setUserName] = useState(""); // Initialize userName state variable to an empty string
  const [password, setPassword] = useState(""); // Initialize password state variable to an empty string
  
  // This function is called when the user clicks the login button
  const login = () => {
    context.authenticate(userName, password);
  };
  
  // This function is called to get the location of the previous page
  let location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  // If the user is authenticated, redirect to the previous page
  if (context.isAuthenticated) {
    return <Navigate to={from.pathname} />;
  }

  const formStyles = {
    maxWidth: '320px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '8px',
    backgroundColor: '#fff', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#6200EE', 
    color: 'white',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const linkStyle = {
    color: '#6200EE', 
    textDecoration: 'none',
  };

  // Render the login form
  return (
    <div style={formStyles}>
      <h2>Login Page</h2>
      <p>You must log in to view the protected pages</p>
      <input
        style={inputStyle}
        id="username"
        placeholder="Username"
        onChange={e => setUserName(e.target.value)}
      />
      <input
        style={inputStyle}
        id="password"
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <button style={buttonStyle} onClick={login}>Log in</button>
      <p>Not Registered? <Link to="/signup" style={linkStyle}>Sign Up!</Link></p>
    </div>
  );
};

export default LoginPage;
