import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

const WriterSidebar = ({ onSelect }) => (
  <Box sx={{ width: 250, bgcolor: 'background.paper', height: '100vh' }}>
    <List>
      <ListItem button onClick={() => onSelect('articles')}>
        <ListItemText primary="Write Articles" />
      </ListItem>
      <ListItem button onClick={() => onSelect('edit')}>
        <ListItemText primary="Edit Articles" />
      </ListItem>
      <ListItem button onClick={() => onSelect('publish')}>
        <ListItemText primary="Publish Articles" />
      </ListItem>
    </List>
  </Box>
);

export default WriterSidebar;
