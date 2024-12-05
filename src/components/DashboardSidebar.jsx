import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

const drawerWidth = 240;

const DashboardSidebar = ({ onSelect }) => {
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
                <ListItem onClick={() => onSelect('profile')}>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem onClick={() => onSelect('docCollections')}>
                    <ListItemText primary="Doc Collections" />
                </ListItem>
                <ListItem onClick={() => onSelect('workspace')}>
                    <ListItemText primary="Workspace" />
                </ListItem>
                <ListItem onClick={() => onSelect('learning')}>
                    <ListItemText primary="Learning" />
                </ListItem>
                <ListItem onClick={() => onSelect('settings')}>
                    <ListItemText primary="Settings" />
                </ListItem>
                <ListItem onClick={() => onSelect('support')}>
                    <ListItemText primary="Support" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default DashboardSidebar;
