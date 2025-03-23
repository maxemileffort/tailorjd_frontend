import React from 'react';
import { Card, CardContent } from '@mui/material';
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
    
    <Box py={4}>
    <Typography variant="h5" gutterBottom>
    How Credits Work
    </Typography>
    
    <Card elevation={3} sx={{ maxWidth: 700, margin: '0 auto', textAlign: 'left' }}>
    <CardContent>
    <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
    Only pay when you create something new:
    <br /><br />
    <strong>✔ 3 credits</strong> — Full rewrite (resume + cover letter)<br />
    <strong>✔ 1 credit</strong> — Rewrite just a section<br />
    <strong>✔ 5 credits</strong> — Draft a resume from scratch
    <br /><br />
    <strong>No credits</strong> are used for edits, downloads, or formatting.
    </Typography>
    <Typography variant="body2" color="textSecondary">
    <em>Example: Tailoring your resume for 5 jobs = 15 credits.</em>
    </Typography>
    </CardContent>
    </Card>
    </Box>   
    
    {/* A La Carte Section */}
    <ALaCarteCards />
    {/* Free Credits Callout */}
    <Box py={4}>
    <Typography variant="h5" color="black">
    <u>Try Us Risk-Free: Get 20 Credits just for Signing Up!</u>
    </Typography>
    <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
    Sign up today and start exploring with 20 free credits. No commitments. No card required.
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
