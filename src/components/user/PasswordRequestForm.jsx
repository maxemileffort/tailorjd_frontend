import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Alert } from '@mui/material';

const PasswordRequestForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!email) {
      setError(true);
      setMessage('Email is required.');
      return;
    }
    
    setError(false);
    setMessage('');

    try {
      // Prepare payload
      const payload = { email };
      
      // Make the POST request to send reset link
      const apiUrl = import.meta.env.VITE_API_BASE_URL; // Adjust according to your .env setup
      const response = await fetch(`${apiUrl}/api/auth/request-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to send reset link.');
      }

      setMessage('If that email exists, we will send you a reset link shortly.');
    } catch (error) {
      setError(true);
      setMessage(error.message || 'An error occurred while sending the request.');
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
          Password Reset Request
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{message}</Alert>}
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5 }}
          >
            Send Reset Link
          </Button>
        </form>
        {!error && message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
      </Box>
    </Container>
  );
};

export default PasswordRequestForm;
