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
import CheckoutSuccess from './pages/CheckoutSuccess';
import SignUpSuccess from './pages/SignUpSuccess';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import LegalPage from './pages/Legal';
import FeaturesPage from './pages/FeaturesPage';
import Writer from './pages/Writer';
import NotFound from './pages/Error404'
// import Blog from './pages/Blog'
// import SingleBlogPost from './pages/SinglePost'
import Footer from './components/Footer';
import ProtectedRoute from './routes/ProtectedRoute';
import { UserProvider, UserContext } from './context/UserContext';
import ScrollToTop from './components/ScrollToTop';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD814', // Yellow
    },
    secondary: {
      main: '#FFA41C', // Orange
    },
    error: {
      main: '#f44336', // 
    },
    background: {
      default: '#f5f5f5', // 
      paper: '#ffffff',  // 
    },
    text: {
      primary: '#000000', // 
      secondary: '#757575', // 
    },
    // Adding a tertiary color
    tertiary: {
      main: '#021AFD', // Blue
      contrastText: '#ffffff', // Optional contrast text color
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <Router>
    <UserProvider>
      
        <ScrollToTop />
        <CssBaseline />
        <MainContent />
      
    </UserProvider>
    </Router>
    </ThemeProvider>
  );
};

const MainContent = () => {
  const location = useLocation();
  const shouldHideFooter = location.pathname.includes('dashboard');
  
  const { isAuthenticated, role } = React.useContext(UserContext);
  
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
        <Route path="/success" element={<CheckoutSuccess />} />
        <Route path="/signupsuccess" element={<SignUpSuccess />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user-dashboard/home" element={<UserDashboard role={role} />} />
        <Route path="/user-dashboard/profile" element={<UserDashboard role={role} subElement={'profile'}/>} />
        <Route path="/user-dashboard/doc-collections" element={<UserDashboard role={role} subElement={'docCollections'}/>} />
        <Route path="/user-dashboard/docCollections" element={<UserDashboard role={role} subElement={'docCollections'}/>} />
        <Route path="/user-dashboard/workspace" element={<UserDashboard role={role} subElement={'workspace'}/>} />
        <Route path="/user-dashboard/learning" element={<UserDashboard role={role} subElement={'learning'}/>} />
        <Route path="/user-dashboard/settings" element={<UserDashboard role={role} subElement={'settings'}/>} />
        <Route path="/user-dashboard/support" element={<UserDashboard role={role} subElement={'support'}/>} />
        <Route path="/user-dashboard" element={<UserDashboard role={role} />} />
        <Route path="/pricing" element={<Pricing />} />
        {/* <Route path="/blog" element={<Blog />} /> */}
        {/* <Route path="/blog/:id" element={<SingleBlogPost />} /> */}

        
        {/* Admin Protected Routes */}
        <Route
        path="/admin/*"
        element={
          <ProtectedRoute
          isAuthenticated={isAuthenticated}
          role={role}
          requiredRoles={["ADMIN"]}
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
          requiredRoles={["ADMIN", "WRITER"]}
          redirectPath="/"
          />
        }
        >
        <Route path="" element={<Writer />} />
        </Route>
        
        <Route path="/reset/*" element={<PasswordReset />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
    {/* Footer */}
    {!shouldHideFooter && <Footer />}
    </Box>
  );
};

export default App;