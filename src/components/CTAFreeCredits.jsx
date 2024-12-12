import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <Box
      py={6}
      bgcolor="primary.main"
      color="white"
      mt={4}
      borderRadius={2}
      margin={'1% auto'}
      padding={'3%'}
    >
      <Typography variant="h4" color="black" gutterBottom>
        Ready to Land Your Dream Job?
      </Typography>
      {/* <Typography variant="body1" color="black">
        Join thousands of job seekers who’ve transformed their careers with TailorJD.
      </Typography>
      <Typography variant="body1" color="black">
        Join hundreds of job seekers who’ve transformed their careers with TailorJD.
      </Typography>
      <Typography variant="body1" color="black">
        Join dozens of job seekers who’ve transformed their careers with TailorJD.
      </Typography> */}
      <Typography variant="body1" color="black">
        Join the career seekers upgrading their job hunts with TailorJD.
      </Typography>
      <br />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={() => navigate('/signup')} // Navigate to /signup
      >
        Sign Up Now
      </Button>
    </Box>
  );
};

export default CallToAction;
