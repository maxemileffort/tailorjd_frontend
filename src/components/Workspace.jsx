// import React from 'react';
// import {
//     Box,
//     TextField,
//     Button,
//     Typography
// } from '@mui/material';

// const Workspace = () => {
//     return (
//         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  height: '100vh' }}>
//             <Box sx={{ display: 'flex', width: '100%', maxWidth: '1200px', justifyContent: 'space-between', mb: 2 }}>
//                 <Box sx={{ width: '48%' }}>
//                     <Typography variant="h6" gutterBottom>Resume</Typography>
//                     <Typography variant="body1" gutterBottom>Copy / Paste your resume here.</Typography>
//                     <TextField
//                         multiline
//                         rows={10}
//                         variant="outlined"
//                         fullWidth
//                     />
//                 </Box>
//                 <Box sx={{ width: '48%' }}>
//                     <Typography variant="h6" gutterBottom>JD</Typography>
//                     <Typography variant="body1" gutterBottom>Copy / Paste any job description here.</Typography>
//                     <TextField
//                         multiline
//                         rows={10}
//                         variant="outlined"
//                         fullWidth
//                     />
//                 </Box>
//             </Box>
//             <Button variant="contained" size="large" sx={{ width: '400px' }}>
//                 Begin Rewrite
//             </Button>
//             <br></br>
//             <Typography variant="p" gutterBottom>The "process" aligns your resume with this JD. It takes a minute or 2, so go put on some coffee.</Typography>
//         </Box>
//     );
// };

// export default Workspace;

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import axiosInstance from '../api/axiosInstance'; // Adjust the path accordingly

const Workspace = () => {
  const [userResume, setUserResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('jwtToken');

      if (!token) {
        // User is not authenticated
        window.location.href = '/login';
        return;
      }

      // Set the Authorization header
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await axiosInstance.post('/rewrites', {
        user_resume: userResume,
        jd: jobDescription,
      });

      // Handle the response
      console.log('Response:', response.data);

      // Redirect to results page
    //   window.location.href = `/results/${response.data.collectionId}`;
    } catch (err) {
      console.error('Error submitting data:', err);
      setError('An error occurred while processing your request.');
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

export default Workspace;
