import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Navbar from '../components/Navbar';
import LoginForm from '../components/user/LoginForm';
import { Box, Typography } from '@mui/material';

const Login = () => {
  return (
    <>
      <Navbar />
      <LoginForm />
      
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body2">
          <Link to="/forgot-password">Forgot Password?</Link>
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </Box>
    </>
  );
};

export default Login;
