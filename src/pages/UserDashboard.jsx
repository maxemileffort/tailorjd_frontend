import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Button,
  Typography
} from '@mui/material';
import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS } from 'react-joyride';
import SimpleFooter from '../components/FooterSimple';
import SideBarToggle from '../components/SideBarToggle';       // Adjust the path as needed
import DashboardSidebar from '../components/DashboardSidebar';
import NotificationBar from '../components/NotificationBar';
import useDynamicComponentRenderer from '../hooks/useDynamicComponentRenderer';


const UserDashboard = ({ role }) => {
  const navigate = useNavigate();

  const { selectedComponent, setSelectedComponent, renderComponent } =
  useDynamicComponentRenderer();
  const [creditBalance, setCreditBalance] = useState(0);
  const [adminMessage, setAdminMessage] = useState(
    "Welcome! If you're new, try the tour!"
  );

  // Sidebar State
  const [isOpen, setIsOpen] = useState(false);
  
  const homeSelected = selectedComponent === 'home';
  
  // Joyride state (Tour)
  const [tourRunning, setTourRunning] = useState(false);
  
  const fetchCreditBalance = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken) {
        console.error('Not authenticated.');
        // Redirect to login
        navigate('/login');
        return;
      }
      
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${apiUrl}/api/credits/read-credits`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch credit balance');
      }
      
      const data = await response.json();
      setCreditBalance(data.creditBalance);
    } catch (error) {
      console.error('Error fetching credit balance:', error);
    }
  };
  
  useEffect(() => {
    fetchCreditBalance();
  }, [selectedComponent, isOpen]);
  
  const handleTourStart = () => {
    setIsOpen(true)
    setTourRunning(true);
  };
  
  const tourSteps = [
    {
      target: '.sidebar-item-home', // Add a class to the corresponding sidebar item
      content: 'This is your dashboard home. You’ll find an overview of your account here!',
    },
    {
      target: '.sidebar-item-profile',
      content: 'Visit your profile to manage your personal information. You can save a rez here to make your workflow faster.',
    },
    {
      target: '.sidebar-item-docCollections',
      content: 'Access all your saved document collections here.',
    },
    {
      target: '.sidebar-item-workspace',
      content: 'Use the workspace to draft resumes and cover letters.',
    },
    {
      target: '.sidebar-item-learning',
      content: 'Find learning materials and tutorials here.',
    },
    {
      target: '.sidebar-item-settings',
      content: 'Customize your preferences and settings.',
    },
    {
      target: '.sidebar-item-support',
      content: 'Need help? Visit the support section for assistance.',
      callback: () => setIsOpen(false),
    },
    {
      target: '.notification-bar-buy-credits', // Add a class to the Buy Credits button
      content: "Buy credits to keep on keepin' on with the rewrites!",
    },
    {
      target: 'body', // No specific target, just a celebration
      content: 'Congratulations! You’ve completed the tour!',
      placement: 'center',
      disableBeacon: true,
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { action, index, origin, status, type } = data;

    if (index === 7 && isOpen) {
      setIsOpen(false);
    }

    if (action === ACTIONS.CLOSE || [STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setTourRunning(false);
    }
    
  };
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
    <CssBaseline />
    
    {/* Tour content */}
    <Joyride
    steps={tourSteps}
    continuous
    run={tourRunning}
    showSkipButton
    styles={{
      options: {
        zIndex: 10000,
      },
    }}
    callback={handleJoyrideCallback}
    /> 
    
    {/* Sidebar */}
    <DashboardSidebar 
      onSelect={setSelectedComponent} 
      role={role}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
    
    {/* Main Content */}
    <Box
    component="main"
    sx={{
      flexGrow: 1,
      p: 3,
      // marginLeft: `${drawerWidth}px`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
    >
    <Box sx={{
      display: 'flex',
      width : '100%'
      // justifyContent: 'space-between'
    }}>
      <Typography variant='body1' sx={{display: 'flex', alignItems: 'center'}}>
      <SideBarToggle onToggle={() => setIsOpen(true)} /> Menu
      </Typography>
    
    {/* <NotificationBar
    creditBalance={creditBalance}
    adminMessage={adminMessage}
    /> */}
    
    </Box>
    <NotificationBar
      creditBalance={creditBalance}
      adminMessage={adminMessage}
      />
      
      {homeSelected && <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 2, mb: 2, maxWidth: '35%'  }}
        onClick={handleTourStart}
        >
        Take the Tour
        </Button>}
        
        <Box sx={{ flexGrow: 1 }}>{renderComponent()}</Box>
        
        <SimpleFooter />
        </Box>
        </Box>
      );
    };
    
    export default UserDashboard;
    