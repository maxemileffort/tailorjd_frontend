import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Alert } from '@mui/material';

const PasswordResetForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setMessage(''); // Clear message when typing
  };
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setMessage(''); // Clear message when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (password.length < 8 || confirmPassword.length < 8) {
      setError(true);
      setMessage('Both passwords must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError(true);
      setMessage('Passwords do not match.');
      return;
    }

    setError(false);
    setMessage('');

    try {
      // Prepare payload
      const payload = { password };
      
      // Make the POST request to reset the password
      const apiUrl = import.meta.env.VITE_API_BASE_URL; // Adjust according to your .env setup
      const token = window.location.pathname.split('/reset/')[1]; // Extract token from URL
      const response = await fetch(`${apiUrl}/api/auth/reset/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to reset password.');
      }

      setMessage('Your password has been successfully reset!');
    } catch (error) {
      setError(true);
      setMessage(error.message || 'An error occurred while resetting your password.');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 3,
          border: '1px solid #ddd',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Reset Your Password
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{message}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="New Password"
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              variant="outlined"
              required
            />
            {password.length > 0 && password.length < 8 && (
              <Typography color="error" variant="caption">Password must be at least 8 characters long.</Typography>
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              variant="outlined"
              required
            />
            {confirmPassword.length > 0 && confirmPassword.length < 8 && (
              <Typography color="error" variant="caption">Password must be at least 8 characters long.</Typography>
            )}
            {password && confirmPassword && password !== confirmPassword && (
              <Typography color="error" variant="caption">Passwords do not match.</Typography>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5 }}
          >
            Reset Password
          </Button>
        </form>

        {!error && message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
      </Box>
    </Container>
  );
};

export default PasswordResetForm;