import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Navbar from '../components/Navbar';
import PasswordRequestForm from '../components/user/PasswordRequestForm';
import { Box, Typography } from '@mui/material';

const PasswordRequest = () => {
  return (
    <>
      <Navbar />
      <PasswordRequestForm />
      
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body2">
          Or you can <Link to="/login">login here.</Link>
        </Typography>
      </Box>
    </>
  );
};

export default PasswordRequest;
