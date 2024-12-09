import React from 'react';
import { Container, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import CallToAction from '../components/CTAFreeCredits';

const FeaturesPage = () => {
  return (
    <Box>
      <Navbar />
      <Container
        maxWidth="lg"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
      >
        
        <Features />
        <CallToAction />
      </Container>
    </Box>
    
  );
};

export default FeaturesPage;