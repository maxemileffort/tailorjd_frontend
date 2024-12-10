import React from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const SidebarToggle = ({ onToggle }) => {

  return (
    <IconButton onClick={onToggle} sx={{ display: { xs: 'block' }, color: 'primary' }}>
      <MenuIcon />
    </IconButton>
  );
};

export default SidebarToggle;
