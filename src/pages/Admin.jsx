import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import SideBarToggle from '../components/user/SideBarToggle'; 
import useAdminComponentRenderer from '../hooks/useAdminComponentRenderer';
import { Box, Typography } from '@mui/material';

const AdminPage = () => {
  const { selectedComponent, setSelectedComponent, renderComponent } =
  useAdminComponentRenderer();
  
  // Sidebar State
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar 
        onSelect={setSelectedComponent } 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)} />
      <Box sx={{ display: 'flex', flexDirection: "column", mt: 2}}>
        <Typography variant='body1' sx={{display: 'flex', alignItems: 'center'}}>
        <SideBarToggle  onToggle={() => setIsOpen(true)} /> Menu
        </Typography>
        <Box sx={{ flexGrow: 1, p: 3 }}>{renderComponent()}</Box>
      </Box>
      
    </Box>
  );
};

export default AdminPage;
