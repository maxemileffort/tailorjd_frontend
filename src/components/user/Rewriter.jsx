import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import axiosInstance from '../../api/axiosInstance'; 

const Rewriter = () => {
  const [userResume, setUserResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);
  const [isFetchingResume, setIsFetchingResume] = useState(true);

  useEffect(() => {
    const fetchCurrentResume = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
          window.location.href = '/login';
          return;
        }

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const { data } = await axiosInstance.get('/users/demographics');

        // Set currentResume to userResume if it exists
        setUserResume(data.currentResume || '');
      } catch (err) {
        console.error('Error fetching current resume:', err);
        setError('Failed to load your current resume.');
      } finally {
        setIsFetchingResume(false);
      }
    };

    fetchCurrentResume();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setErrorInfo(null);

    try {
      const response = await axiosInstance.post('/rewrites', 
        {
          user_resume: userResume,
          jd: jobDescription,
        }, 
        // {
        //   timeout: 10 * 1000 // Timeout set to 10000 milliseconds (10 seconds)
        // } 
      );

      console.log('Response:', response.data);

      // Redirect to results page
      // window.location.href = `/doccollections`;
    } catch (err) {
      console.error('Error submitting data:', err);
      setError('An error occurred while processing your request.');
      setErrorInfo(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  if (isFetchingResume) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: '1200px',
          justifyContent: 'space-between',
          mb: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ width: { xs: '100%', md: '48%' }, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Resume
          </Typography>
          <Typography variant="body1" gutterBottom>
            Copy / Paste your resume here.
          </Typography>
          <TextField
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            value={userResume}
            onChange={(e) => setUserResume(e.target.value)}
          />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '48%' }, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Job Description
          </Typography>
          <Typography variant="body1" gutterBottom>
            Copy / Paste any job description here.
          </Typography>
          <TextField
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </Box>
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
        {loading ? 'Processing...' : 'Begin Rewrite'}
      </Button>
      <br />
      <Typography variant="body1" gutterBottom>
        The process aligns your resume with this job description. It may take a minute or two, so grab a coffee!
      </Typography>
    </Box>
  );
};

export default Rewriter;
