// import React from 'react';
// import { 
//   Box, 
//   Typography, 
//   Container, 
//   Grid2 as Grid, 
//   Button, 
//   TextField, 
//   IconButton, 
//   List, 
//   ListItem } from '@mui/material';
//   import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
//   import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
  
//   const Footer = () => {
//     return (
//       <Box
//       component="footer"
//       sx={{
//         py: 4,
//         px: 2,
//         mt: 'auto',
//         backgroundColor: (theme) =>
//           theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
//       }}
//       >
//       <Container maxWidth="lg">
//       <Grid container spacing={4} justifyContent="space-between">
//       {/* Navigation Section */}
//       <Grid item xs={12} md={3}>
//       <Typography variant="h6" gutterBottom>
//       Navigation
//       </Typography>
//       <List >
//       <ListItem>
//       <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
//       Home
//       </RouterLink>
//       </ListItem>
//       <ListItem>
//       <RouterLink to="/features" style={{ textDecoration: 'none', color: 'inherit' }}>
//       Features
//       </RouterLink>
//       </ListItem>
//       <ListItem>
//       <RouterLink to="/pricing" style={{ textDecoration: 'none', color: 'inherit' }}>
//       Pricing
//       </RouterLink>
//       </ListItem>
//       <ListItem>
//       <RouterLink to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
//       Sign Up
//       </RouterLink>
//       </ListItem>
//       </List>
      
//       </Grid>
      
//       {/* Newsletter Subscription */}
//       <Grid item xs={12} md={4}>
//       <Typography variant="h6" gutterBottom>
//       Subscribe to our Newsletter
//       </Typography>
//       <Typography variant="body2" color="textSecondary" gutterBottom>
//       Get updates and insights directly to your inbox.
//       </Typography>
//       <Box component="form" sx={{ display: 'flex', gap: 1 }}>
//       <TextField
//       variant="outlined"
//       placeholder="Your email address"
//       size="small"
//       fullWidth
//       />
//       <Button variant="contained" color="primary">
//       Subscribe
//       </Button>
//       </Box>
//       </Grid>
      
//       {/* Social Media Links */}
//       <Grid item xs={12} md={2}>
//       <Typography variant="h6" gutterBottom>
//       Follow Us
//       </Typography>
//       <Box>
//       <IconButton href="https://facebook.com" target="_blank" color="inherit">
//       <Facebook />
//       </IconButton>
//       <IconButton href="https://twitter.com" target="_blank" color="inherit">
//       <Twitter />
//       </IconButton>
//       <IconButton href="https://linkedin.com" target="_blank" color="inherit">
//       <LinkedIn />
//       </IconButton>
//       <IconButton href="https://instagram.com" target="_blank" color="inherit">
//       <Instagram />
//       </IconButton>
//       </Box>
//       </Grid>
      
//       {/* Legal Links */}
//       <Grid item xs={12} md={3}>
//       <Typography variant="h6" gutterBottom>
//       Legal
//       </Typography>
//       <RouterLink to="/legal#terms" style={{ textDecoration: 'none', color: 'inherit' }}>
//       Terms of Service
//       </RouterLink>
//       <RouterLink to="/legal#privacy" style={{ textDecoration: 'none', color: 'inherit' }}>
//       Privacy Policy
//       </RouterLink>
//       <RouterLink to="/legal#cookie-policy" style={{ textDecoration: 'none', color: 'inherit' }}>
//       Cookie Policy
//       </RouterLink>
//       </Grid>
//       </Grid>
      
//       {/* Footer Bottom */}
//       <Box mt={4} textAlign="center">
//       <Typography variant="body2" color="textSecondary">
//       © {new Date().getFullYear()} TailorJD. All rights reserved.
//       </Typography>
//       <Typography variant="body2" color="textSecondary">
//       Made with ❤️ by TailorJD Team
//       </Typography>
//       </Box>
//       </Container>
//       </Box>
//     );
//   };
  
//   export default Footer;
  
import React from 'react';
import { Box, Typography, Container, Grid, Button, TextField, IconButton, List, ListItem } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 4, px: 2, mt: 'auto', backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Navigation Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Navigation
            </Typography>
            <List>
              <ListItem>
                <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Home
                </RouterLink>
              </ListItem>
              <ListItem>
                <RouterLink to="/features" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Features
                </RouterLink>
              </ListItem>
              <ListItem>
                <RouterLink to="/pricing" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Pricing
                </RouterLink>
              </ListItem>
              <ListItem>
                <RouterLink to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Sign Up
                </RouterLink>
              </ListItem>
            </List>
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
            <List>
              <ListItem>
                <RouterLink to="/legal#terms" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Terms of Service
                </RouterLink>
              </ListItem>
              <ListItem>
                <RouterLink to="/legal#privacy" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Privacy Policy
                </RouterLink>
              </ListItem>
              <ListItem>
                <RouterLink to="/legal#cookie-policy" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Cookie Policy
                </RouterLink>
              </ListItem>
            </List>
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
