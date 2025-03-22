// import React, { useState } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Alert,
// } from '@mui/material';
// import axiosInstance from '../../api/axiosInstance'; // Adjust the path accordingly

// const Drafter = () => {
//   const [jd1, setJd1] = useState('');
//   const [jd2, setJd2] = useState('');
//   const [jd3, setJd3] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [errorInfo, setErrorInfo] = useState(null);

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError(null);
//     setErrorInfo(null);

//     try {
//       const token = sessionStorage.getItem('jwtToken');

//       if (!token) {
//         window.location.href = '/login';
//         return;
//       }

//       axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//       const response = await axiosInstance.post('/rewrites/draft', 
//         {
//           jd1,jd2,jd3,
//         }, 
//         // {
//         //   timeout: 10 * 1000 // Timeout set to 10000 milliseconds (10 seconds)
//         // } 
//       );

//       console.log('Response:', response.data);

//       // Redirect to results page
//       // window.location.href = `/results/${response.data.collectionId}`;
//     } catch (err) {
//       console.error('Error submitting data:', err);
//       setError('An error occurred while processing your request.');
//       setErrorInfo(err.response.data.error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         height: '120vh',
//         p: 2,
//       }}
//     >
//         <Typography variant="body1" gutterBottom> 
//             No resume? No problem! This module lets you use 3 job descriptions to craft a rez template for beginning the journey to new employment.
//             <br></br>
//             <br></br>
//         </Typography>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           width: '100%',
//           maxWidth: '800px',
//           mb: 2,
//         }}
//       >
//         {['JD1', 'JD2', 'JD3'].map((label, index) => (
//           <Box key={label} sx={{ mb: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               {label}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Copy / Paste {label} here.
//             </Typography>
//             <TextField
//               multiline
//               rows={6}
//               variant="outlined"
//               fullWidth
//               value={[jd1, jd2, jd3][index]}
//               onChange={(e) => {
//                 if (index === 0) setJd1(e.target.value);
//                 if (index === 1) setJd2(e.target.value);
//                 if (index === 2) setJd3(e.target.value);
//               }}
//             />
//           </Box>
//         ))}
//       </Box>
//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       )}
//       {errorInfo && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {errorInfo}
//         </Alert>
//       )}
//       <Button
//         variant="contained"
//         size="large"
//         sx={{ width: '400px' }}
//         onClick={handleSubmit}
//         disabled={loading}
//       >
//         {loading ? 'Processing...' : 'Begin Draft'}
//       </Button>
//       <br />
//       <Typography variant="body1" gutterBottom>
//         This process generates a tailored draft based on your input job descriptions. It may take a few moments—thank you for your patience!
//       </Typography>
//     </Box>
//   );
// };

// export default Drafter;

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const Drafter = () => {
  const navigate = useNavigate();

  const [jd1, setJd1] = useState('');
  const [jd2, setJd2] = useState('');
  const [jd3, setJd3] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setErrorInfo(null);

    try {
      const token = sessionStorage.getItem('jwtToken');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await axiosInstance.post('/rewrites/draft', {
        jd1,
        jd2,
        jd3,
      });

      const newJobId = response.data.jobId;
      checkJobStatus(newJobId);
      setSnackbarMessage('Draft is generating in the background...');
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
        if (response.status === 200) {
          const result = response.data;
          if (result.status === 'FAILED') {
            clearInterval(interval);
            setError(result.errorMessage || 'Draft job failed.');
          } else if (result.status === 'COMPLETED') {
            clearInterval(interval);
            setSnackbarMessage('Draft complete!');
            setSnackbarOpen(true);
          }
        }
      } catch (err) {
        console.error('Error checking job status:', err);
        clearInterval(interval);
        setError('Failed to check draft job status.');
      }
    }, 5000); // every 5 seconds
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
        <br />
        <br />
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
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Begin Draft'}
      </Button>

      <br />
      <Typography variant="body1" gutterBottom>
        This process generates a tailored draft based on your input job descriptions. It may take a few moments—thank you for your patience!
      </Typography>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <Button color="inherit" onClick={() => navigate('/user-dashboard/doc-collections')}>
            Go to Doc Collections
          </Button>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      />
    </Box>
  );
};

export default Drafter;
