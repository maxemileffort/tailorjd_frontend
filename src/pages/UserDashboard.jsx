import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CssBaseline,
  Typography,
} from '@mui/material';
import SimpleFooter from '../components/FooterSimple';
import DashboardSidebar from '../components/DashboardSidebar';
import NotificationBar from '../components/NotificationBar';
import Profile from '../components/Profile';
import DocCollections from '../components/DocCollections';
import Workspace from '../components/Workspace';
import Learning from '../components/Learning';
import Settings from '../components/Settings';
import Support from '../components/Support';

const drawerWidth = 60;

const UserDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('home'); // Default component
  const [creditBalance, setCreditBalance] = useState(0); // State to hold the credit balance
  const [adminMessage, setAdminMessage] = useState('Welcome! Enjoy our latest promo: 20% off credits.');
  
  // Fetch the credit balance when the component mounts
  useEffect(() => {
    const fetchCreditBalance = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken'); // Retrieve the token from localStorage
        
        if (!jwtToken) {
          console.error('No JWT token found');
          return;
        }
        
        const apiUrl = import.meta.env.VITE_API_BASE_URL; // Use the API base URL from environment variables
        const response = await fetch(`${apiUrl}/api/credits/read-credits`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`, // Pass the token in the Authorization header
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch credit balance');
        }
        
        const data = await response.json();
        setCreditBalance(data.creditBalance); // Update the state with the fetched credit balance
      } catch (error) {
        console.error('Error fetching credit balance:', error);
      }
    };
    
    fetchCreditBalance();
  }, []);
  
  // Function to handle sidebar item clicks
  const handleSidebarSelection = (component) => {
    setSelectedComponent(component);
  };

  const handleTourStart = () => {
    return;
  }
  
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
        <br></br>
        <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
        At the top, you'll see your credit balance. One credit = one <strong>Rewrite</strong>. Also, we will refer to Resume as Rez.
        </Typography>
        <br></br>
        <Typography variant="body1" color="textSecondary">
        A Rewrite has 3 parts: <br></br><br></br>
        1) An <u>analysis</u> of your current rez compared against a job description (JD); <br></br>
        2) A <u>Rewrite</u> of your current rez. This Rewrite aligns your rez with the JD Ideal Candidate's resume, making you more likely to get picked for that position; and<br></br>
        3) A <u>cover letter</u> to go with that application if you feel the need to have one.
        <br></br>
        <br></br>
        </Typography>

        <Typography variant="body1" color="textSecondary">
        That's the basics. If more details would be helpful, you can use the menu to the left. Find the link for "Learning" and watch a few videos to learn more about the process.
        <br></br>
        <br></br>
        </Typography>

        <Typography variant="body1" color="textSecondary">
        If you are interested, to learn your way around, there's also a tour.
        <br></br>
        </Typography>

        <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: '20px' }}
            onClick={handleTourStart} 
          >
            Take the Tour
        </Button>
        <br></br>
        <br></br>

        <Typography variant="h4" gutterBottom>
        Coming Soon
        </Typography>
        <Typography variant="body1" color="textSecondary">
        The following features are in the works (in no particular order). <br></br>
        1) Google Drive Integration <br></br>
        2) Saving Resumes to your profile. <br></br>
        3) Resume Drafting <br></br>
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
    
    <NotificationBar 
    creditBalance={creditBalance}
    adminMessage={adminMessage}
    onBuyCredits={() => alert('Redirecting to buy credits...')}
    />
    
    <Box sx={{ flexGrow: 1 }}>{renderComponent()}</Box>
    
    {/* Simplified Footer */}
    <SimpleFooter />
    </Box>
    </Box>
  );
};

export default UserDashboard;
