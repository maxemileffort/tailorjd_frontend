import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import axiosInstance from '../api/axiosInstance'; // Adjust the path accordingly

const Drafter = () => {
  const [jd1, setJd1] = useState('');
  const [jd2, setJd2] = useState('');
  const [jd3, setJd3] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setErrorInfo(null);

    try {
      const token = localStorage.getItem('jwtToken');

      if (!token) {
        window.location.href = '/login';
        return;
      }

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await axiosInstance.post('/rewrites/draft', 
        {
          jd1,jd2,jd3,
        }, 
        {
          timeout: 10 * 1000 // Timeout set to 10000 milliseconds (10 seconds)
        } 
      );

      console.log('Response:', response.data);

      // Redirect to results page
      // window.location.href = `/results/${response.data.collectionId}`;
    } catch (err) {
      console.error('Error submitting data:', err);
      setError('An error occurred while processing your request.');
      setErrorInfo(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '120vh',
        p: 2,
      }}
    >
        <Typography variant="body1" gutterBottom> 
            No resume? No problem! This module lets you use 3 job descriptions to craft a rez template for beginning the journey to new employment.
            <br></br>
            <br></br>
        </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '800px',
          mb: 2,
        }}
      >
        {['JD1', 'JD2', 'JD3'].map((label, index) => (
          <Box key={label} sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {label}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Copy / Paste {label} here.
            </Typography>
            <TextField
              multiline
              rows={6}
              variant="outlined"
              fullWidth
              value={[jd1, jd2, jd3][index]}
              onChange={(e) => {
                if (index === 0) setJd1(e.target.value);
                if (index === 1) setJd2(e.target.value);
                if (index === 2) setJd3(e.target.value);
              }}
            />
          </Box>
        ))}
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {errorInfo && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorInfo}
        </Alert>
      )}
      <Button
        variant="contained"
        size="large"
        sx={{ width: '400px' }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Begin Draft'}
      </Button>
      <br />
      <Typography variant="body1" gutterBottom>
        This process generates a tailored draft based on your input job descriptions. It may take a few moments—thank you for your patience!
      </Typography>
    </Box>
  );
};

export default Drafter;
