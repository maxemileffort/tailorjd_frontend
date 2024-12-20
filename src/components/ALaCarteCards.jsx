import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from '../utils/jwtParser';
import SignUpForm from './user/SignUpForm';

import {
  Box,
  Typography,
  Button,
  Grid2,
  Card,
  CardContent,
  CardActions,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';

const pk = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(pk);

const ALaCarteCards = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [statePlanId, setPlanId] = useState(null);
  
  // Check token validity
  const token = sessionStorage.getItem('jwtToken');
  if (token && !userId) {
    const decodedToken = parseJwt(token);
    setUserId(decodedToken.id);
    setUserEmail(decodedToken.email);
  }
  
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = (planId) => {
    setOpen(false);
    handleCheckout(planId);
  }
  const handleDelModal = () => setOpen(false);
  
  const handleCheckout = async (planId) => {
    setPlanId(planId);
    if (!token) {
      // If no token, open the signup modal
      handleOpenModal();
      return;
    }
    
    try {
      const stripe = await stripePromise;
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${apiUrl}/api/checkouts/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, userId: userId || null, email: userEmail }),
      });
      
      const { id: sessionId } = await response.json();
      
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  
  return (
    <Box py={6}>
    <Typography variant="h4" gutterBottom>
    Need More Flexibility? Go A La Carte!
    </Typography>
    <Grid2 container spacing={4} justifyContent="center">
    {/* 10 Credits */}
    <Grid2 xs={12} sm={6} md={4}>
    <Card elevation={3} sx={{ height: '100%', width: '275px' }}>
    <CardContent>
    <Typography variant="h5" gutterBottom>
    10 Credits
    </Typography>
    <Typography color="textSecondary" paragraph>
    $12
    </Typography>
    <Typography color="textSecondary" variant="body2">
    Ideal for occasional use.
    </Typography>
    </CardContent>
    <CardActions>
    <Button
    variant="contained"
    color="secondary"
    fullWidth
    onClick={() => handleCheckout('alacarte10')}
    >
    Buy Now
    </Button>
    </CardActions>
    </Card>
    </Grid2>
    
    {/* 50 Credits */}
    <Grid2 xs={12} sm={6} md={4}>
    <Card elevation={3} sx={{ height: '100%', width: '275px' }}>
    <CardContent>
    <Typography variant="h5" gutterBottom>
    50 Credits
    </Typography>
    <Typography color="textSecondary" paragraph>
    $50
    </Typography>
    <Typography color="textSecondary" variant="body2">
    Perfect for short bursts of activity.
    </Typography>
    </CardContent>
    <CardActions>
    <Button
    variant="contained"
    color="primary"
    fullWidth
    onClick={() => handleCheckout('alacarte50')}
    >
    Buy Now
    </Button>
    </CardActions>
    </Card>
    </Grid2>
    </Grid2>
    
    {/* Modal for Signup Form */}
    <Modal
    open={open}
    onClose={handleCloseModal}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
    >
    <Fade in={open}>
    <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    }}
    >
    {/* Close Button */}
    <Button
    onClick={handleDelModal}
    sx={{
      position: 'absolute',
      top: 8,
      right: 8,
      minWidth: 'unset',
      padding: 0,
      borderRadius: '50%',
    }}
    >
    <Typography variant="h6" component="span" color="textSecondary">
    &times;
    </Typography>
    </Button>
    
    <Typography variant="h6" component="h2" gutterBottom>
    Sign Up to Continue
    </Typography>
    <SignUpForm onSuccess={() => handleCloseModal(statePlanId)} />
    </Box>
    </Fade>
    </Modal>
    </Box>
  );
};

export default ALaCarteCards;
