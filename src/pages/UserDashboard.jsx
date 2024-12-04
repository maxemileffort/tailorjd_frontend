import React, { useState } from 'react';
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
import DashboardSidebar from '../components/DashboardSidebar';
import Profile from '../components/Profile';
import DocCollections from '../components/DocCollections';
import Workspace from '../components/Workspace';
import Learning from '../components/Learning';
import Settings from '../components/Settings';
import Support from '../components/Support';

const drawerWidth = 60;

const UserDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('home'); // Default component
  
  // Function to handle sidebar item clicks
  const handleSidebarSelection = (component) => {
    setSelectedComponent(component);
  };
  
  // Function to render different components based on the selected option
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'profile':
        return <Profile />;
      case 'docCollections':
        return <DocCollections />;
      case 'workspace':
        return <Workspace />;
      case 'learning':
        return <Learning />;
      case 'settings':
        return <Settings />;
      case 'support':
        return <Support />;
      default:
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              Welcome to Your Dashboard
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Placeholder content for the dashboard main area.
            </Typography>
          </Box>
        );
    }
  };
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
    <CssBaseline />
    
    {/* Sidebar */}

    <DashboardSidebar onSelect={handleSidebarSelection} />
    
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

    <Box sx={{ flexGrow: 1 }}>{renderComponent()}</Box>
    
    {/* Simplified Footer */}
    <SimpleFooter />
    </Box>
    </Box>
  );
};

export default UserDashboard;
