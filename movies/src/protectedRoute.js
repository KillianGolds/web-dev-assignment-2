import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from './contexts/authContext'

// A wrapper for <Route> that redirects to the login
const ProtectedRoutes = () => {

  const context = useContext(AuthContext); // Get the authToken and userId from the AuthContext
  const location = useLocation(); // Get the current location

  return context.isAuthenticated === true ? ( 
    <Outlet /> 
  ) : (
    <Navigate to='/login' replace state={{ from: location }}/>
  ); 
}; 

export default ProtectedRoutes;