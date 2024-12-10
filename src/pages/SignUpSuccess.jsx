import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const SignUpSuccess = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Navbar sx={{ mb: 1 }} />
      
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Sign Up Successful!
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Thank you for signing up! We're excited to have you on board.
        </Typography>

        <Typography variant="h6">Next Steps</Typography>
        <Typography variant="body2" gutterBottom>
          Please check your email inbox for a confirmation email.
        </Typography>
        <Typography variant="body2" gutterBottom>
          Follow the link in the email to set your password and log in for the first time.
        </Typography>
        <Typography variant="body2" gutterBottom>
          If you don’t see the email, please also check your spam or junk folders.
        </Typography>
        <Typography variant="body2">
          If you still can't find it, <a href="#" onClick={() => navigate('/contact')}>send us a message</a> and we'll assist you.
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/login')}
          >
            Go to Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpSuccess;
