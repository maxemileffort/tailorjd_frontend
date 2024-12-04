import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Navbar from '../components/Navbar';
import SignUpForm from '../components/SignUpForm';
import { Box, Typography } from '@mui/material';

const SignUp = () => {
  return (
    <>
      <Navbar />
      <SignUpForm />
      
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body2">
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Box>
    </>
  );
};

export default SignUp;
