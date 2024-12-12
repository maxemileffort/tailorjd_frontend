import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Navbar from '../components/Navbar';
import PasswordResetForm from '../components/user/PasswordResetForm';
import { Box, Typography } from '@mui/material';

const PasswordRequest = () => {
  return (
    <>
      <Navbar />
      <PasswordResetForm />
      
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body2">
          Or you can <Link to="/login">login here.</Link>
        </Typography>
      </Box>
    </>
  );
};

export default PasswordRequest;
