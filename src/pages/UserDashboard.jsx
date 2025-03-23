import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Button,
  Typography
} from '@mui/material';
import Joyride, { ACTIONS, STATUS } from 'react-joyride';

import SimpleFooter from '../components/user/FooterSimple';
import SideBarToggle from '../components/user/SideBarToggle';
import DashboardSidebar from '../components/user/DashboardSidebar';
import NotificationBar from '../components/user/NotificationBar';

import Profile from '../components/user/Profile';
import DocCollections from '../components/user/DocCollections';
import Workspace from '../components/user/Workspace';
import Learning from '../components/user/Learning';
import Settings from '../components/user/Settings';
import Support from '../components/user/Support';
import DashboardHome from '../components/user/DashboardHome';

const UserDashboard = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [creditBalance, setCreditBalance] = useState(0);
  const [adminMessage, setAdminMessage] = useState("Welcome! If you're new, try the tour!");
  const [isOpen, setIsOpen] = useState(false);
  const [tourRunning, setTourRunning] = useState(false);

  const subPath = location.pathname.split('/user-dashboard/')[1] || 'home';

  const fetchCreditBalance = async () => {
    try {
      const jwtToken = sessionStorage.getItem('jwtToken');
      if (!jwtToken) {
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
      if (!response.ok) throw new Error('Failed to fetch credit balance');
      const data = await response.json();
      setCreditBalance(data.creditBalance);
    } catch (error) {
      console.error('Error fetching credit balance:', error);
    }
  };

  useEffect(() => {
    fetchCreditBalance();
  }, [subPath, isOpen]);

  const handleTourStart = () => {
    setIsOpen(true);
    setTourRunning(true);
  };

    const tourSteps = [
    {
      target: '.sidebar-item-home', // Add a class to the corresponding sidebar item
      content: 'This is your dashboard home. You’ll find an overview of your account here!',
      disableBeacon: true,
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
    const { action, index, status } = data;
    if (index === 7 && isOpen) setIsOpen(false);
    if (action === ACTIONS.CLOSE || [STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setTourRunning(false);
    }
  };

  const renderComponent = () => {
    switch (subPath) {
      case 'profile': return <Profile />;
      case 'doc-collections': return <DocCollections />;
      case 'docCollections': return <DocCollections />;
      case 'workspace': return <Workspace />;
      case 'learning': return <Learning />;
      case 'settings': return <Settings />;
      case 'support': return <Support />;
      case 'home':
      default: return <DashboardHome />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Joyride
        steps={tourSteps}
        continuous
        run={tourRunning}
        showSkipButton
        disableBeacon
        showProgress
        disableOverlayClose
        styles={{ options: { zIndex: 10000 } }}
        callback={handleJoyrideCallback}
        locale={{
          last: "Finished",  // 👈 this changes the "Last" button
          skip: "Skip",
          next: "Next",
          back: "Back",
        }}
      />

      <DashboardSidebar
        onSelect={(slug) => navigate(`/user-dashboard/${slug}`)}
        role={role}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Typography variant='body1' sx={{ display: 'flex', alignItems: 'center' }}>
            <SideBarToggle onToggle={() => setIsOpen(true)} /> Menu
          </Typography>
        </Box>

        <NotificationBar creditBalance={creditBalance} adminMessage={adminMessage} messageDestination={'/user-dashboard/home'} />

        {subPath === 'home' && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2, mb: 2, maxWidth: '35%' }}
            onClick={handleTourStart}
          >
            Take the Tour
          </Button>
        )}

        <Box sx={{ flexGrow: 1 }}>{renderComponent()}</Box>

        <SimpleFooter />
      </Box>
    </Box>
  );
};

export default UserDashboard;
