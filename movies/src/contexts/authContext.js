import React, { useState, createContext } from "react";
import { login, signup } from "../api/login-signup-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data); 
  }

  const [userId, setUserId] = useState(null);

  const authenticate = async (username, password) => {
    console.log("Authenticating user:", username);
  
    try {
      const result = await login(username, password);
      console.log("Login result:", result);
  
      if (result.token && result.userId) { // Ensure that both token and userId are present
        console.log("Token and user ID received:", result.token, result.userId);
        setToken(result.token); //Take the token from the result and put it in local storage
        localStorage.setItem('userId', result.userId); // Take the user id and store it in local storage
        setIsAuthenticated(true); // Set isAuthenticated to true
        setUserName(username);
        setUserId(result.userId); // Set the userId state variable to the user ID from the result
        console.log("Authentication successful for user:", username); // Log the successful authentication
      } else {
        console.log("No token or user ID received in the result:", result); // Log the failed authentication
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };
  
  // Function to register a new user
  const register = async (username, password) => {
    const result = await signup(username, password);
    console.log(result.code);
    return (result.code === 201) ? true : false;
  };

  // Function to sign out a user
  const signout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    setAuthToken(null); // Clear the token from state
    setTimeout(() => setIsAuthenticated(false), 100); // Set isAuthenticated to false
  };
  
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
        userId: localStorage.getItem('userId'), 
        authToken: localStorage.getItem('token'), 
      }}
    >
      {props.children}
    </AuthContext.Provider>
);

};

export default AuthContextProvider;