import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';

// This component renders the sign up page
const SignUpPage = props => {
  const context = useContext(AuthContext); // Get the AuthContext from the AuthContextProvider
  const [userName, setUserName] = useState(""); // Initialize userName state variable to an empty string
  const [password, setPassword] = useState(""); // Initialize password state variable to an empty string
  const [passwordAgain, setPasswordAgain] = useState(""); // Initialize passwordAgain state variable to an empty string
  const [registered, setRegistered] = useState(false); // Initialize registered state variable to false

  // This function is called when the user clicks the register button
  const register = () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (validPassword && password === passwordAgain) {
      context.register(userName, password);
      setRegistered(true);
    }
  }; // If the passwords match and are valid, register the user

  // If the user is registered, redirect to the login page 
  if (registered) {
    return <Navigate to="/login" />;
  }

  const styles = {
    container: {
      maxWidth: '320px',
      margin: '20px auto',
      padding: '20px',
      textAlign: 'center',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      width: '100%',
      padding: '10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#6200EE', 
      color: 'white',
      cursor: 'pointer',
      marginTop: '10px',
    },
  };

  // Render the sign up form
  return (
    <div style={styles.container}>
      <h2>Sign Up Page</h2>
      <p>You must register a username and password to log in</p>
      <input 
        style={styles.input}
        value={userName} 
        placeholder="Username" 
        onChange={e => setUserName(e.target.value)}
      /><br />
      <input 
        style={styles.input}
        type="password" 
        value={password} 
        placeholder="Password" 
        onChange={e => setPassword(e.target.value)}
      /><br />
      <input 
        style={styles.input}
        type="password" 
        value={passwordAgain} 
        placeholder="Password again" 
        onChange={e => setPasswordAgain(e.target.value)}
      /><br />
      <button style={styles.button} onClick={register}>Register</button>
    </div>
  );
};

export default SignUpPage;
