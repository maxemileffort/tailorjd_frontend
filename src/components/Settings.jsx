import React from 'react';
import { Box, Typography } from '@mui/material';

const Settings = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">Settings</Typography>
            <Typography variant="body1">
                Modify your application settings here.
            </Typography>
        </Box>
    );
};

export default Settings;
