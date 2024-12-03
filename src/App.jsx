import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import SignUp from './pages/SignUp';
import UserDashboard from './pages/UserDashboard';

import Footer from './components/Footer';


const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
          </Routes>
        </Box>
        {/* Footer */}
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
