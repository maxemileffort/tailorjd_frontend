import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

const ProfileInfoForm = ({ profileData, handleChange, disabled }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="First Name"
                value={profileData.f_name || ''} // Ensure controlled component
                onChange={(e) => handleChange('f_name', e.target.value)}
                disabled={disabled}
                fullWidth
            />
            <TextField
                label="Last Name"
                value={profileData.l_name || ''} // Ensure controlled component
                onChange={(e) => handleChange('l_name', e.target.value)}
                disabled={disabled}
                fullWidth
            />
            <Typography variant="body1">What job descriptions are you targeting for new employment?</Typography>
            <TextField
                label="Job Description Target"
                value={profileData.jd_target || ''} // Ensure controlled component
                onChange={(e) => handleChange('jd_target', e.target.value)}
                disabled={disabled}
                fullWidth
            />
            <Typography variant="body1">What job category does your current work fall under?</Typography>
            <TextField
                label="Current Industry"
                value={profileData.currentIndustry || ''} // Ensure controlled component
                onChange={(e) => handleChange('currentIndustry', e.target.value)}
                disabled={disabled}
                fullWidth
            />
        </Box>
    );
};

export default ProfileInfoForm;
