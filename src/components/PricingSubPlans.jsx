import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from '../utils/jwtParser'
import SignUpForm from './user/SignUpForm';

import { 
  Box, 
  Typography, 
  Button, 
  Grid2, 
  Card, 
  CardContent, 
  CardActions, 
  Chip ,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';

const pk = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(pk);

const PricingSubPlans = () => {
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
  };
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
    Save More with Subscriptions
    </Typography>
    <Grid2 
    container 
    spacing={4} 
    justifyContent="center" 
    sx={{ alignItems: 'stretch' }} // Ensures all items stretch
    >
    {/* Standard Plan */}
    <Grid2 xs={12} sm={6} md={4} sx={{ display: 'flex' }}> {/* Ensure each Grid2 stretches */}
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', flex: 1 }}>
    <Card 
    elevation={3} 
    sx={{ 
      height: '100%', 
      width: '275px', 
      display: 'flex', 
      flexDirection: 'column', // Makes content and actions stack properly
      justifyContent: 'space-between', // Distributes content evenly
    }}
    >
    <CardContent>
    <Typography variant="h4" gutterBottom>
    Standard
    </Typography>
    <Typography color="textSecondary" variant="h5">
    $5 / month
    </Typography>
    <Typography variant="h6" sx={{ mt: 2 }}>
    50 credits / month
    </Typography>
    <Typography color="textSecondary" variant="body2">
    Great for casual job searching.
    </Typography>
    </CardContent>
    <CardActions>
    <Button
    variant="contained"
    color="primary"
    fullWidth
    onClick={() => handleCheckout('standard')}
    >
    Get Standard
    </Button>
    </CardActions>
    </Card>
    </Box>
    </Grid2>
    
    {/* Silver Plan */}
    <Grid2  xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', flex: 1 }}>
    <Chip
    label="Most Popular"
    sx={{
      position: 'absolute',
      top: 25,
      left: -25, // Adjust position relative to the Card
      transform: 'rotate(-45deg)', // Rotate 45 degrees counterclockwise
      transformOrigin: 'center',
      bgcolor: '#F7D000',
      zIndex: 2,
      fontSize: '1.1em',
    }}
    />
    <Card 
    elevation={15} 
    sx={{ 
      height: '100%', 
      width: '275px', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
    >
    <CardContent>
    <Typography variant="h4" gutterBottom>
    Silver
    </Typography>
    <Typography color="textSecondary" variant="h5">
    $25 / month
    </Typography>
    <Typography variant="h6" sx={{ mt: 2 }}>
    500 credits / month
    </Typography>
    <Typography color="textSecondary" variant="body2">
    Perfect for motivated job hunters.
    </Typography>
    </CardContent>
    <CardActions>
    <Button
    variant="contained"
    color="secondary"
    fullWidth
    onClick={() => handleCheckout('silver')}
    >
    Get Silver
    </Button>
    </CardActions>
    </Card>
    </Box>
    </Grid2>
    
    {/* Gold Plan */}
    <Grid2  xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', flex: 1 }}>
    <Chip
    label="Best Deal"
    color="primary"
    sx={{
      position: 'absolute',
      top: 25,
      left: -15, // Adjust position relative to the Card
      transform: 'rotate(-45deg)', // Rotate 45 degrees counterclockwise
      transformOrigin: 'center',
      zIndex: 2,
      fontSize: '1.1em',
    }}
    />
    <Card 
    elevation={3} 
    sx={{ 
      height: '100%', 
      width: '275px', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
    >
    <CardContent>
    <Typography variant="h4" gutterBottom>
    Gold
    </Typography>
    <Typography color="textSecondary" variant="h5">
    $50 / month
    </Typography>
    <Typography variant="h6" sx={{ mt: 2 }}>
    1500 credits / month
    </Typography>
    <Typography color="textSecondary" variant="body2">
    Best for job coaches and career changers.
    </Typography>
    </CardContent>
    <CardActions>
    <Button
    variant="contained"
    color="primary"
    fullWidth
    onClick={() => handleCheckout('gold')}
    >
    Get Gold
    </Button>
    </CardActions>
    </Card>
    </Box>
    </Grid2>
    </Grid2>

    {/* Modal for Signup Form */}
    <Modal
        open={open}
        onClose={handleDelModal}
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

export default PricingSubPlans;
