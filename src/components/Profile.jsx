import React from 'react';
import { Box, Typography } from '@mui/material';

const Profile = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">Profile</Typography>
            <Typography variant="body1">
                This is your profile section where you can view and edit your personal information.
            </Typography>
        </Box>
    );
};

export default Profile;
