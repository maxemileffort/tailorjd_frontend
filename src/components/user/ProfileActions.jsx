import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';

const ProfileActions = ({ onSave, onReset, isSaving, isUploading }) => {
    const isDisabled = isSaving || isUploading;

    return (
        <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={onSave}
                disabled={isDisabled}
            >
                {isSaving ? <CircularProgress size={24} /> : 'Save Changes'}
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                onClick={onReset}
                disabled={isDisabled}
            >
                Reset Fields
            </Button>
        </Box>
    );
};

export default ProfileActions;
