import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import PricingSubPlans from '../components/PricingSubPlans';
import PricingCompTable from '../components/PricingCompTable';
import ALaCarteCards from '../components/ALaCarteCards';

import {
  Container,
  Box,
  Typography,
  Button,
} from '@mui/material';

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeroSection />
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        

        {/* Subscriptions Section */}
        <PricingSubPlans />

        {/* Comparison Table */}
        <PricingCompTable />

        {/* A La Carte Section */}
        <ALaCarteCards />
        {/* Free Credits Callout */}
        <Box py={4}>
          <Typography variant="h5" color="primary">
            Try Us Risk-Free: Get 5 Credits just for Signing Up!
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            Sign up today and start exploring with 5 free credits. No commitments. No card required.
          </Typography>
        </Box>
        <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 1, mb:1 }}
        onClick={() => navigate('/signup')}
      >
        Get Started Today
      </Button>
      </Container>
    </>
  );
};

export default Pricing;
