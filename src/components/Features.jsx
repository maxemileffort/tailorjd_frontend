import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

const Features = () => {
  return (
    <Container>
      <Typography variant="h2" sx={{ mt: 2 }} gutterBottom>
        Why Choose TailorJD?
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" color="primary">
            Effortless Customization
          </Typography>
          <Typography>
            Automatically tailor resumes and cover letters to match any job description in seconds.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h5" color="primary">
            Smarter Applications
          </Typography>
          <Typography>
            Get AI-driven insights to optimize your applications and boost your chances of getting noticed.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h5" color="primary">
            Time-Saving Tools
          </Typography>
          <Typography>
            Streamline your job hunt with tools designed to save time and effort, all in one place.
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h4" gutterBottom style={{ marginTop: '40px' }}>
        The Old Way vs. The New Way
      </Typography>

      <Typography>
        Gone are the days of manually crafting the perfect resume for each job application. 
        With TailorJD, you harness the power of AI wizardry to do the heavy lifting for you!
      </Typography>

        <br></br>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" color="secondary">
            The Old Way:
          </Typography>
          <Typography>
            - Manual tailoring takes hours of work.<br />
            - Risk of overlooking key skills or experiences.<br />
            - Requires constant updates and revisions.<br />
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" color="secondary">
            The New Way with TailorJD:
          </Typography>
          <Typography>
            - Instant resume customization based on job descriptions.<br />
            - Advanced AI evaluates and optimizes your application.<br />
            - Focus on finding your dream job while we handle the details!
          </Typography>
        </Grid>
      </Grid>


      <Typography variant="h6" style={{ marginTop: '30px', fontStyle: 'italic' }}>
        Experience the magic of AI with TailorJD—because your applications deserve to stand out!
      </Typography>
    </Container>
  );
};

export default Features;