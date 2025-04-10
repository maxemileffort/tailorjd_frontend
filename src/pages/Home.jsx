import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CallToAction from '../components/CTAFreeCredits' 
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <>
      <Navbar />
      <Container
        maxWidth="md"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
      >
        {/* Hero Section */}
        <Box py={6}>
          <Typography variant="h3" gutterBottom>
            Land Your Dream Job Faster
          </Typography>
          <Typography variant="body1" color="textSecondary" >
            TailorJD customizes your resume and cover letter for each job description (JD) using AI — no wondering, no guessing. 
            Just tailored applications that get interviews.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: '20px' }}
            onClick={() => navigate('/signup')} // Navigate to /signup
          >
            Get Started for Free
          </Button>
        </Box>

        {/* Features Section */}
<Box id="features" py={6}>
  <Typography variant="h4" gutterBottom>
    How TailorJD Helps You Get Hired
  </Typography>
  <Grid container spacing={4}>
    <Grid item xs={12} md={4}>
      <Card
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5" gutterBottom>
            Effortless Customization
          </Typography>
          <Typography color="textSecondary">
            Automatically tailor resumes and cover letters to match any job description in seconds.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={4}>
      <Card
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5" gutterBottom>
            Smarter Applications
          </Typography>
          <Typography color="textSecondary">
            Get AI-driven insights to optimize your applications and boost your chances of getting noticed.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={4}>
      <Card
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5" gutterBottom>
            Time-Saving Tools
          </Typography>
          <Typography color="textSecondary">
            Streamline your job hunt with tools designed to save time and effort, all in one place.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</Box>


        {/* Call to Action Section */}
        {/* <Box
          py={6}
          bgcolor="primary.main"
          color="white"
          mt={4}
          borderRadius={2}
          margin={'1% auto'}
          padding={'3%'}
        >
          <Typography variant="h4" gutterBottom>
            Ready to Land Your Dream Job?
          </Typography>
          <Typography variant="body1" >
            Join thousands of job seekers who’ve transformed their careers with TailorJD.
          </Typography>
          <br></br>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/signup')} // Navigate to /signup
          >
            Sign Up Now
          </Button>
        </Box> */}

      <CallToAction />
      </Container>
    </>
  );
};

export default Home;
