import React, { useState } from 'react';
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

const drawerWidth = 240;

const DashboardSidebar = ({ onSelect, role, isOpen, onClose }) => {
  const navigate = useNavigate();
  const isAdmin = ['admin'].includes(String(role).toLowerCase());
  const isWriter = ['admin', 'writer'].includes(String(role).toLowerCase());

  const handleLogout = () => {
    // Remove token from sessionStorage
    sessionStorage.removeItem('jwtToken');

    // Redirect to login
    navigate('/login');
  };

  return (
    <>
      {/* Button to open the drawer on mobile */}

      {/* Sidebar Drawer */}
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
            TailorJD
          </Typography>
          <IconButton onClick={onClose} sx={{ position: 'absolute', right: 10, top: 10, color: 'black' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          <ListItem onClick={() => {onSelect('home'); onClose()}} sx={{ cursor: 'pointer' }} className="sidebar-item-home">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem onClick={() => {onSelect('profile'); onClose()}} sx={{ cursor: 'pointer' }} className="sidebar-item-profile">
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem onClick={() => {onSelect('docCollections'); onClose()}} sx={{ cursor: 'pointer' }} className="sidebar-item-docCollections">
            <ListItemText primary="Doc Collections" />
          </ListItem>
          <ListItem onClick={() => {onSelect('workspace'); onClose()}} sx={{ cursor: 'pointer' }} className="sidebar-item-workspace">
            <ListItemText primary="Workspace" />
          </ListItem>
          <ListItem onClick={() => {onSelect('learning'); onClose()}} sx={{ cursor: 'pointer' }} className="sidebar-item-learning">
            <ListItemText primary="Learning" />
          </ListItem>
          <ListItem onClick={() => {onSelect('settings'); onClose()}} sx={{ cursor: 'pointer' }} className="sidebar-item-settings">
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem onClick={() => {onSelect('support'); onClose()}} sx={{ cursor: 'pointer' }} className="sidebar-item-support">
            <ListItemText primary="Support" />
          </ListItem>
          {isAdmin && 
            <ListItem onClick={() => {navigate('/admin'); onClose()}} sx={{ cursor: 'pointer' }} className="sidebar-item-admin">
              <ListItemText primary="Admin" />
            </ListItem>
          }
          {isWriter && 
            <ListItem onClick={() => {navigate('/writer'); onClose()}} sx={{ cursor: 'pointer' }} className="sidebar-item-writer">
              <ListItemText primary="Writers" />
            </ListItem>
          }
          <ListItem onClick={() => handleLogout(navigate)} sx={{ cursor: 'pointer' }} className="sidebar-item-logout">
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default DashboardSidebar;
