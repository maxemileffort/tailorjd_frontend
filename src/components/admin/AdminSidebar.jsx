import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = 250;

const AdminSidebar = ({ onSelect, isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('jwtToken');
    navigate('/login');
  };

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      variant="temporary"
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #FFD814, #FFD814)',
          color: 'black',
        },
      }}
    >
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Typography variant="h6" noWrap>
          Admin Panel
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 10, top: 10, color: 'black' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        <ListItem
          onClick={() => {
            onSelect('charts');
            onClose();
          }}
          sx={{ cursor: 'pointer' }}
          className="sidebar-item-dashboard"
        >
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          onClick={() => {
            onSelect('users');
            onClose();
          }}
          sx={{ cursor: 'pointer' }}
          className="sidebar-item-users"
        >
          <ListItemText primary="Manage Users" />
        </ListItem>
        <ListItem
          onClick={() => {
            onSelect('logs');
            onClose();
          }}
          sx={{ cursor: 'pointer' }}
          className="sidebar-item-logs"
        >
          <ListItemText primary="Activity Logs" />
        </ListItem>
        <ListItem
          onClick={() => {
            onSelect('affiliates');
            onClose();
          }}
          sx={{ cursor: 'pointer' }}
          className="sidebar-item-affiliates"
        >
          <ListItemText primary="Affiliates" />
        </ListItem>
        <ListItem
          onClick={() => {
            navigate('/user-dashboard')
            onClose();
          }}
          sx={{ cursor: 'pointer' }}
          className="sidebar-item-user-dashboard"
        >
          <ListItemText primary="User Dashboard" />
        </ListItem>
        <ListItem
          onClick={() => handleLogout()}
          sx={{ cursor: 'pointer' }}
          className="sidebar-item-logout"
        >
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
