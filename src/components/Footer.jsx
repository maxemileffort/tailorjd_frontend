import React from 'react';
import { Box, Typography, Container, Grid, Button, TextField, IconButton, Link } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        {/* Footer Content */}
        <Grid container spacing={4} justifyContent="space-between">
          {/* Navigation Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Navigation
            </Typography>
            <Link href="/" color="inherit" underline="hover" display="block">
              Home
            </Link>
            <Link href="/features" color="inherit" underline="hover" display="block">
              Features
            </Link>
            <Link href="/pricing" color="inherit" underline="hover" display="block">
              Pricing
            </Link>
            <Link href="/signup" color="inherit" underline="hover" display="block">
              Sign Up
            </Link>
          </Grid>

          {/* Newsletter Subscription */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Subscribe to our Newsletter
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Get updates and insights directly to your inbox.
            </Typography>
            <Box component="form" sx={{ display: 'flex', gap: 1 }}>
              <TextField
                variant="outlined"
                placeholder="Your email address"
                size="small"
                fullWidth
              />
              <Button variant="contained" color="primary">
                Subscribe
              </Button>
            </Box>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton href="https://facebook.com" target="_blank" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="https://linkedin.com" target="_blank" color="inherit">
                <LinkedIn />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" color="inherit">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          {/* Legal Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Link href="/terms" color="inherit" underline="hover" display="block">
              Terms of Service
            </Link>
            <Link href="/privacy" color="inherit" underline="hover" display="block">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" color="inherit" underline="hover" display="block">
              Cookie Policy
            </Link>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} TailorJD. All rights reserved.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Made with ❤️ by TailorJD Team
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
