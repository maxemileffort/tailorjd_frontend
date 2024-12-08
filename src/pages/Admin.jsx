import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Box, Typography } from '@mui/material';

const AdminPage = () => {
  const [selectedPage, setSelectedPage] = useState('dashboard');

  const renderContent = () => {
    switch (selectedPage) {
      case 'dashboard':
        return <Typography variant="h4">Admin Dashboard</Typography>;
      case 'users':
        return <Typography variant="h4">Manage Users</Typography>;
      case 'logs':
        return <Typography variant="h4">Activity Logs</Typography>;
      default:
        return <Typography variant="h4">Admin Dashboard</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar onSelect={setSelectedPage} />
      <Box sx={{ flexGrow: 1, p: 3 }}>{renderContent()}</Box>
    </Box>
  );
};

export default AdminPage;
