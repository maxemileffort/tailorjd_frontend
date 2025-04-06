import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoginForm from '../components/user/LoginForm';
import { Box, Typography, Alert, Container } from '@mui/material'; // Import Alert and Container

const Login = () => {
  const [logoutMessage, setLogoutMessage] = useState('');

  useEffect(() => {
    const reason = sessionStorage.getItem('logoutReason');
    if (reason) {
      switch (reason) {
        case 'session_expired':
          setLogoutMessage('Your session has expired. Please log in again.');
          break;
        case 'session_invalid':
          setLogoutMessage('Your session was invalid. Please log in again.');
          break;
        default:
          setLogoutMessage('You have been logged out.');
      }
      sessionStorage.removeItem('logoutReason'); // Clear the reason after displaying
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs"> {/* Wrap content for better alignment */}
        {logoutMessage && (
          <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
            {logoutMessage}
          </Alert>
        )}
        <LoginForm />
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2">
            <Link to="/password-request">Forgot Password?</Link> {/* Corrected link */}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Login;
