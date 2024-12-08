import React, { useEffect, useState } from 'react';
import {
  Box,
  CssBaseline,
  Button
} from '@mui/material';
import Joyride from 'react-joyride';
import SimpleFooter from '../components/FooterSimple';
import DashboardSidebar from '../components/DashboardSidebar';
import NotificationBar from '../components/NotificationBar';
import useDynamicComponentRenderer from '../hooks/useDynamicComponentRenderer';

const drawerWidth = 60;

const UserDashboard = ({ role }) => {
  const { selectedComponent, setSelectedComponent, renderComponent } =
    useDynamicComponentRenderer();
  const [creditBalance, setCreditBalance] = useState(0);
  const [adminMessage, setAdminMessage] = useState(
    'Welcome! Enjoy our latest promo: 20% off credits.'
  );

  const homeSelected = selectedComponent === 'home';

  const [tourRunning, setTourRunning] = useState(false);

  const fetchCreditBalance = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken) {
        console.error('No JWT token found');
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
  }, []);

  const handleTourStart = () => {
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
        callback={(data) => {
          if (data.status === 'finished' || data.status === 'skipped') {
            setTourRunning(false);
          }
        }}
      /> 

      {/* Sidebar */}
      <DashboardSidebar onSelect={setSelectedComponent} role={role}/>

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
        <NotificationBar
          creditBalance={creditBalance}
          adminMessage={adminMessage}
          onBuyCredits={() => alert('Redirecting to buy credits...')}
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
