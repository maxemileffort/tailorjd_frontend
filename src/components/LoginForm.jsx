import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from '@mui/material';

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        // Redirect to dashboard if already logged in
        navigate('/user-dashboard');
    }
}, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
  
    // Basic Validation
    if (!email || !password) {
      setError('All fields are required.');
      return;
    }
  
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
  
    setError('');
    setSuccess(false);
  
    // Prepare payload
    const payload = {
      email,
      password,
    };
  
    try {
      // Make the POST request to log in the user
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${apiUrl}/api/auth/login`, { // Change endpoint to your login API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to log in.');
      }
  
      setSuccess(true);
      console.log('User logged in successfully');
      
      // Get the token from the response (assuming it's returned in JSON format)
      const data = await response.json();
      const { token } = data; // Adjust according to your response structure

      // Store the token in local storage (not recommended for sensitive info)
      localStorage.setItem('jwtToken', token);
      
      // Redirect to the dashboard after successful login
      navigate('/user-dashboard');
    } catch (error) {
      setError(error.message || 'An error occurred while logging in.');
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
          Log In
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Login successful! Welcome back.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5 }}
          >
            Log In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;