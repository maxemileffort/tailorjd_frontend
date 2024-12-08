import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

const drawerWidth = 240;

const DashboardSidebar = ({ onSelect, role }) => {
    const navigate = useNavigate();

    const isAdmin = ['admin'].includes(role);
    const isWriter = ['admin', 'writer'].includes(role);

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    background: 'linear-gradient(180deg, #1E3A8A, #1D4ED8)', // Blue Gradient background
                    color: 'white', 
                },
            }}
        >
            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h6" noWrap>
                    TailorJD
                </Typography>
            </Box>
            <List>
                <ListItem onClick={() => onSelect('home')}
                    sx={{cursor: 'pointer'}}
                    className="sidebar-item-home"
                >
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem 
                    onClick={() => onSelect('profile')}
                    sx={{cursor: 'pointer'}}
                    className="sidebar-item-profile"
                >
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem onClick={() => onSelect('docCollections')}
                    sx={{cursor: 'pointer'}}
                    className="sidebar-item-docCollections"
                >
                    <ListItemText primary="Doc Collections" />
                </ListItem>
                <ListItem onClick={() => onSelect('workspace')}
                    sx={{cursor: 'pointer'}}
                    className="sidebar-item-workspace"
                >
                    <ListItemText primary="Workspace" />
                </ListItem>
                <ListItem onClick={() => onSelect('learning')}
                    sx={{cursor: 'pointer'}}
                    className="sidebar-item-learning"
                >
                    <ListItemText primary="Learning" />
                </ListItem>
                <ListItem onClick={() => onSelect('settings')}
                    sx={{cursor: 'pointer'}}
                    className="sidebar-item-settings"
                >
                    <ListItemText primary="Settings" />
                </ListItem>
                <ListItem onClick={() => onSelect('support')}
                    sx={{cursor: 'pointer'}}
                    className="sidebar-item-support"
                >
                    <ListItemText primary="Support" />
                </ListItem>
                {isAdmin &&  <ListItem onClick={() => navigate('/admin')}
                    sx={{cursor: 'pointer'}}
                    className="sidebar-item-admin"
                >
                    <ListItemText primary="Admin" />
                </ListItem>}
                {isWriter &&  <ListItem onClick={() => navigate('/writer')}
                    sx={{cursor: 'pointer'}}
                    className="sidebar-item-writer"
                >
                    <ListItemText primary="Writers" />
                </ListItem>}
            </List>
        </Drawer>
    );
};

export default DashboardSidebar;
