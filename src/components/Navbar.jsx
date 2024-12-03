import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          TailorJD
        </Typography>

        {/* Navigation Links (Desktop) */}
        <div style={{ display: 'none', flexDirection: 'row', gap: '16px' }} className="desktop-menu">
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/features" color="inherit">
            Features
          </Button>
          <Button component={Link} to="/pricing" color="inherit">
            Pricing
          </Button>
        </div>

        {/* Sign Up Button (Desktop) */}
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          color="secondary"
          style={{ display: 'none' }}
          className="desktop-signup"
        >
          Sign Up
        </Button>

        {/* Mobile Menu Button */}
        <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleMenu}>
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
          <ListItem button component={Link} to="/signup" onClick={toggleMenu}>
            <ListItemText primary="Sign Up" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
