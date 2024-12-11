import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 'bold', color: '#3f51b5' }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        It might have been removed or you may have typed the wrong URL.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/')} // redirecting to homepage
        sx={{ padding: '10px 20px' }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFound;
