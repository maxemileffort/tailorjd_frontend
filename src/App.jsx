import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import PasswordRequest from './pages/PasswordRequest';
import PasswordReset from './pages/PasswordReset';
import UserDashboard from './pages/UserDashboard';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <MainContent />
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();
  const shouldHideFooter = location.pathname.startsWith('/userdashboard');

  return (
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
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<PasswordRequest />} />
          <Route path="/reset/*" element={<PasswordReset />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Box>
      {/* Footer */}
      {!shouldHideFooter && <Footer />}
    </Box>
  );
};

export default App;
