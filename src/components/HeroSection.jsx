import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'primary.main',
        color: 'white',
        py: 8,
        px: 2,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Find the Right Plan for You
      </Typography>
      <Typography variant="h5" color="inherit">
        Flexible enough to match your job hunt needs. Save with a subscription or pay as you go!
      </Typography>
      
    </Box>
  );
};

export default HeroSection;
