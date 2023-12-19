import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// This component is used to log the user out of the application.
const LogoutButton = () => {
  const { signout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signout(); // Call the signout function from the AuthContext
    navigate('/'); // Navigate to the home page
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
