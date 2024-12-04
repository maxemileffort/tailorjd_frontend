import React from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import SimpleFooter from '../components/FooterSimple';

const drawerWidth = 240;

const UserDashboard = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #1E3A8A, #1D4ED8)', // Gradient background
            color: 'white', // White text color
          },
        }}
      >
        <Box sx={{ padding: 2, textAlign: 'center' }}>
          <Typography variant="h6" noWrap>
            TailorJD
          </Typography>
        </Box>
        <List>
          <ListItem button>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Doc Collections" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Learning" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Support" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: `${drawerWidth}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome to Your Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Placeholder content for the dashboard main area.
          </Typography>
        </Box>

        {/* Simplified Footer */}
        <SimpleFooter />
      </Box>
    </Box>
  );
};

export default UserDashboard;
