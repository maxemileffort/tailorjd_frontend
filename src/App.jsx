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
import Pricing from './pages/Pricing';
import Success from './pages/Success';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import LegalPage from './pages/Legal';
import FeaturesPage from './pages/FeaturesPage';
import Writer from './pages/Writer';
import Footer from './components/Footer';
import ProtectedRoute from './routes/ProtectedRoute';

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
  const shouldHideFooter = location.pathname.includes('dashboard');

  const isAuthenticated = true; // Replace with actual authentication logic
  const role = 'admin'; // Replace with actual role logic (e.g., 'admin' or 'writer')

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
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/forgot-password" element={<PasswordRequest />} />
          <Route path="/reset/*" element={<PasswordReset />} />
          {/* <Route path="/success?session_id=*" element={<Success />} /> */}
          <Route path="/success" element={<Success />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/userdashboard" element={<UserDashboard role={role}/>} />
          <Route path="/pricing" element={<Pricing />} />
          {/* Admin Protected Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                role={role}
                requiredRoles={["admin"]}
                redirectPath="/"
              />
            }
          >
            <Route path="" element={<Admin />} />
          </Route>    

          {/* Writer Protected Routes */}
          <Route
            path="/writer/*"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                role={role}
                requiredRoles={["admin", "writer"]}
                redirectPath="/"
              />
            }
          >
            <Route path="" element={<Writer />} />
          </Route>  

          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Box>
      {/* Footer */}
      <br></br>
      {!shouldHideFooter &&  <Footer />}
    </Box>
  );
};

export default App;
