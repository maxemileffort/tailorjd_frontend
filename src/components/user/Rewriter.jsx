import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Snackbar,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import close icon
import axiosInstance from '../../api/axiosInstance';

const Rewriter = () => {
  const navigate = useNavigate();

  const [userResume, setUserResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);
  const [isFetchingResume, setIsFetchingResume] = useState(true);
  const [jobId, setJobId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // State for snackbar message
  
  
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
      const response = await axiosInstance.post('/rewrites', {
        user_resume: userResume,
        jd: jobDescription,
      });
      console.log('Response:', response.data);
      
      const newJobId = response.data.jobId; 
      setJobId(newJobId); 
      checkJobStatus(newJobId); // Start checking job status
      // Show success snackbar
      setSnackbarMessage("Rewrite happening in the background...");
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Error submitting data:', err);
      setError('An error occurred while processing your request.');
      setErrorInfo(err.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };
  
  const checkJobStatus = (jobId) => {
    const interval = setInterval(async () => {
      try {
        const response = await axiosInstance.get(`/rewrites/job-status/${jobId}`);
        if (response.status === 200) { // Check for a successful status code
          const result = response.data; // Use data directly from Axios
          
          if (result.error) {
            console.error(result.error);
            clearInterval(interval);
            setError('Error checking job status.');
          } else {
            console.log('Job finished:', result);
            clearInterval(interval);
            
            // Show success snackbar
            setSnackbarMessage("Job complete!");
            setSnackbarOpen(true);
          }
        }
      } catch (err) {
        console.error('Error fetching job status:', err);
        clearInterval(interval);
        setError('Failed to check job status.');
      }
    }, 5000); // Check every 5 seconds
    setSnackbarOpen(false);
    // return () => clearInterval(interval); // Cleanup interval on unmounting
  };
  
  // Function to handle closing the snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
    {/* Snackbar for job completion message */}
    <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000} // Toast duration
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                action={
                    <Button color="inherit" onClick={() => {navigate('/user-dashboard/doc-collections');}}>
                        Go to Doc Collections
                    </Button>
                }
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Position
            />
    </Box>
  );
};

export default Rewriter;
