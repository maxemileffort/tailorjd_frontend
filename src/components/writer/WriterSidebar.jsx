import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WriterSidebar = ({ onSelect }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: 250, bgcolor: 'background.paper', height: '100vh' }}>
    <List>
      <ListItem onClick={() => onSelect('articles')}>
        <ListItemText primary="Write Articles" />
      </ListItem>
      <ListItem onClick={() => onSelect('edit')}>
        <ListItemText primary="Edit Articles" />
      </ListItem>
      <ListItem onClick={() => onSelect('manage')}>
        <ListItemText primary="Manage Articles" />
      </ListItem>
      <ListItem
        onClick={() => {
          navigate('/user-dashboard')
          // onClose();
        }}
        sx={{ cursor: 'pointer' }}
        className="sidebar-item-user-dashboard"
      >
        <ListItemText primary="User Dashboard" />
      </ListItem>
    </List>
  </Box>
  )
  
};
  


  


export default WriterSidebar;
