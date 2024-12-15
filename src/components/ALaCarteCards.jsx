import React from 'react';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from '../utils/jwtParser'

import {
    Box,
    Typography,
    Button,
    Grid2,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';

const pk = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(pk);

const ALaCarteCards = () => {
    const navigate = useNavigate();

    const token = sessionStorage.getItem('jwtToken');
    let userId;

    if (token) {
      const decodedToken = parseJwt(token);
      // console.log(JSON.stringify(decodedToken));
      userId = decodedToken.id;
    }

    const handleCheckout = async (planId) => {
      try {
        const stripe = await stripePromise;
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiUrl}/api/checkouts/create-checkout-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planId, userId : userId || null }),
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
        </Box>
    );
}



export default ALaCarteCards;