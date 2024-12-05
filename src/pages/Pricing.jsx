import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection'; 
import {
  Container,
  Box,
  Typography,
  Button,
  Grid2,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeroSection />
      <Container
        maxWidth="md"
        style={{ display: 'flex', flexDirection: 'column', aligns: 'center', textAlign: 'center' }}
      >
        {/* Subscriptions Section */}
        <Box py={6}>
          <Typography variant="h4" gutterBottom>
            Subscribe for Regular, Discounted Credits.
          </Typography>
          <Grid2 container spacing={4}>
            {/* Standard Plan */}
            <Grid2 xs={12} md={4}>
              <Card elevation={3} sx={{ height: '100%', maxWidth: 275 }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    Standard
                  </Typography>
                  <Typography color="textSecondary" variant="h5">
                    $5 / month
                  </Typography>
                  <Typography color="textSecondary" variant="h6">
                    5 credits / month
                  </Typography>
                  <Typography color="textSecondary" variant="h6">
                    Send 1 resume per week
                  </Typography>
                  <Typography color="textSecondary" variant="h6">
                    Casual job searching
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate('/signup')}
                  >
                    Get Standard
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
            {/* Silver Plan */}
            <Grid2 xs={12} md={4}>
              <Card elevation={3} sx={{ height: '100%', maxWidth: 275 }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    Silver
                  </Typography>
                  <Typography color="textSecondary" variant="h5">
                    $25 / month
                  </Typography>
                  <Typography color="textSecondary" variant="h6">
                    50 credits / month
                  </Typography>
                  <Typography color="textSecondary" variant="h6">
                    Send 2-3 resumes daily
                  </Typography>
                  <Typography color="textSecondary" variant="h6">
                    Motivated job hunting
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => navigate('/signup')}
                  >
                    Get Silver
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
            {/* Gold Plan */}
            <Grid2 xs={12} md={4}>
              <Card elevation={3} sx={{ height: '100%', maxWidth: 275 }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    Gold
                  </Typography>
                  <Typography color="textSecondary" variant="h5">
                    $50 / month
                  </Typography>
                  <Typography color="textSecondary" variant="h6">
                    150 credits / month
                  </Typography>
                  <Typography color="textSecondary" variant="h6">
                    Send ~10 resumes daily
                  </Typography>
                  <Typography color="textSecondary" variant="h6">
                    For Coaches and Pros
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate('/signup')}
                  >
                    Get Gold
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          </Grid2>
        </Box>

        {/* A La Carte Section */}
        <Box py={6}>
          <Typography variant="h4" gutterBottom>
            Need More Flexibility? Go A La Carte!
          </Typography>
          <Grid2 container spacing={4}>
            {/* 10 Credits */}
            <Grid2  xs={12} md={4}>
              <Card elevation={3} sx={{ height: '100%', width: 250 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    10 Credits
                  </Typography>
                  <Typography color="textSecondary" paragraph>
                    $10
                  </Typography>
                  <Typography color="textSecondary" variant="h6">
                    They never expire...
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => navigate('/checkout?credits=10')}
                  >
                    Buy Now
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
            {/* 50 Credits */}
            <Grid2  xs={12} md={4}>
              <Card elevation={3} sx={{ height: '100%', width: 250 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    50 Credits
                  </Typography>
                  <Typography color="textSecondary" paragraph>
                    $45
                  </Typography>
                  <Typography color="textSecondary" variant="h6">
                    They last forever!
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate('/checkout?credits=50')}
                  >
                    Buy Now
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
            {/* Custom Credits */}
            <Grid2  xs={12} md={4}>
              <Card elevation={3} sx={{ height: '100%', width: 250 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Custom
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Order the <i>exact</i> amount you need.
                  </Typography>
                  <Typography color="textSecondary" variant="h6">
                    Sell them to your friends and family.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => navigate('/custom-credits')}
                  >
                    Custom Order
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          </Grid2>
        </Box>
      </Container>

    </>
  );
};

export default Pricing;
