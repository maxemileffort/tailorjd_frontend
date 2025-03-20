import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import axiosInstance from '../../api/axiosInstance';

const BulletRewriter = () => {
  const [userBullets, setUserBullets] = useState('');
  const [newBullets, setNewBullets] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setErrorInfo(null);
    try {
      const response = await axiosInstance.post('/rewrites/bulletRewrites', {
        user_bullets: userBullets,
      });
      console.log('Response:', response.data);
      
      const newBulletContent = response.data.bulletContent;
      setNewBullets(newBulletContent);
      
      setSnackbarMessage('Rewrite happening in the background...');
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Error submitting data:', err);
      setError('An error occurred while processing your request.');
      setErrorInfo(err.response?.data?.error);
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
      <Typography variant="body1" gutterBottom>
        Punch up those bullet points! Use this tool to make everyone see your biggest impacts, and in the best way.
      </Typography>
      <Typography variant="body1" gutterBottom>
        NOTE: These don't get saved anywhere, so make sure to copy and paste them into something before you end your session or create new ones.
      </Typography>
      <br />
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
            Bullet Points
          </Typography>
          <Typography variant="body1" gutterBottom>
            Drop the bullet points that you want rewritten here.
          </Typography>
          <TextField
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            value={userBullets}
            onChange={(e) => setUserBullets(e.target.value)}
          />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '48%' }, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            New Bullet Points
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your new bullet points will show up here.
          </Typography>
          <TextField
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            value={newBullets}
            onChange={(e) => setNewBullets(e.target.value)}
          />
        </Box>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {errorInfo && <Alert severity="error" sx={{ mb: 2 }}>{errorInfo}</Alert>}
      <Button
        variant="contained"
        size="large"
        sx={{ width: '400px' }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Rewrite Bullets'}
      </Button>
      <br />
      <Typography variant="body1" gutterBottom>
        Replace your old bullets with these new bullets, and watch your callback rate 🚀
      </Typography>
    </Box>
  );
};

export default BulletRewriter;
