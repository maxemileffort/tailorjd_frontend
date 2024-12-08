import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

const AdminSidebar = ({ onSelect }) => (
  <Box sx={{ width: 250, bgcolor: 'background.paper', height: '100vh' }}>
    <List>
      <ListItem button onClick={() => onSelect('dashboard')}>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => onSelect('users')}>
        <ListItemText primary="Manage Users" />
      </ListItem>
      <ListItem button onClick={() => onSelect('logs')}>
        <ListItemText primary="Activity Logs" />
      </ListItem>
    </List>
  </Box>
);

export default AdminSidebar;
