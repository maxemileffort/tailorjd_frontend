import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; 
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  
  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('jwtToken');
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      try {
        // Set the Authorization header
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Call the token-check endpoint
        const response = await axiosInstance.post('/auth/token-check');
        const newToken = response.data.token;
        
        // Update the token if it was refreshed
        if (newToken && newToken !== token) {
          sessionStorage.setItem('jwtToken', newToken);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        // Token is invalid or expired
        sessionStorage.removeItem('jwtToken');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  return (
    <AppBar position="static">
    <Toolbar>
    {/* Logo */}
    {/*  */}
    
    <Link to="/" style={{ display: "flex", flexGrow: 1, textDecoration: 'none', alignItems: "center" }}>
      <img
      src="/plain.png" // Replace with the path to your logo image
      alt="TailorJD Logo" // A descriptive alt text for accessibility
      style={{ height: '40px', width: 'auto' }} // Adjust styles as necessary
      /> 
      <Typography
      variant="h6"
      // component={Link}
      // to="/"
      sx={{ flexGrow: 1, textDecoration: 'none', color: 'black', ml: 1 }}
      >
       | TailorJD
      </Typography>
    </Link>
    
    {/* Navigation Links (Desktop) */}
    <Box
    sx={{
      display: { xs: 'none', md: 'flex' },
      flexDirection: 'row',
      gap: '16px',
    }}
    >
    <Button component={Link} to="/" color="inherit">
    Home
    </Button>
    {/* <Button component={Link} to="/blog" color="inherit">
    Blog
    </Button> */}
    <Button component={Link} to="/features" color="inherit">
    Features
    </Button>
    <Button component={Link} to="/pricing" color="inherit">
    Pricing
    </Button>
    </Box>
    
    {/* Conditionally render buttons based on authentication status */}
    {!loading && (
      isAuthenticated ? (
        // Dashboard Button
        <Button
        component={Link}
        to="/user-dashboard"
        variant="contained"
        sx={{ display: { xs: 'none', md: 'block' },
        bgcolor: 'white',
        color: '#1976D2',
      }}
      >
      Dashboard
      </Button>
    ) : (
      // Sign Up and Login Buttons
      <>
      <Button
      component={Link}
      to="/signup"
      variant="contained"
      color="secondary"
      sx={{ display: { xs: 'none', md: 'block' } }}
      >
      Sign Up
      </Button>
      <Button
      component={Link}
      to="/login"
      variant="contained"
      sx={{
        display: { xs: 'none', md: 'block' },
        bgcolor: 'white',
        color: 'black',
      }}
      >
      Login
      </Button>
      </>
    )
  )}
  
  {/* Mobile Menu Button */}
  <IconButton
  edge="end"
  color="inherit"
  aria-label="menu"
  onClick={toggleMenu}
  sx={{ display: { xs: 'block', md: 'none' } }}
  >
  <MenuIcon />
  </IconButton>
  </Toolbar>
  
  {/* Mobile Menu */}
  <Drawer anchor="right" open={isMenuOpen} onClose={toggleMenu}>
  <List>
  <ListItem button component={Link} to="/" onClick={toggleMenu}>
  <ListItemText primary="Home" />
  </ListItem>
  <ListItem button component={Link} to="/features" onClick={toggleMenu}>
  <ListItemText primary="Features" />
  </ListItem>
  <ListItem button component={Link} to="/pricing" onClick={toggleMenu}>
  <ListItemText primary="Pricing" />
  </ListItem>
  {isAuthenticated ? (
    <ListItem button component={Link} to="/user-dashboard" onClick={toggleMenu}>
    <ListItemText primary="Dashboard" />
    </ListItem>
  ) : (
    <>
    <ListItem button component={Link} to="/signup" onClick={toggleMenu}>
    <ListItemText primary="Sign Up" />
    </ListItem>
    <ListItem button component={Link} to="/login" onClick={toggleMenu}>
    <ListItemText primary="Login" />
    </ListItem>
    </>
  )}
  </List>
  </Drawer>
  </AppBar>
);
};

export default Navbar;
