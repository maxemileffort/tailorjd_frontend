import React from 'react';
import {
    Box,
    TextField,
    Button,
    Typography
} from '@mui/material';

const Workspace = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  height: '100vh' }}>
            <Box sx={{ display: 'flex', width: '100%', maxWidth: '1200px', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ width: '48%' }}>
                    <Typography variant="h6" gutterBottom>Resume</Typography>
                    <Typography variant="p" gutterBottom>Copy / Paste your resume here.</Typography>
                    <TextField
                        multiline
                        rows={10}
                        variant="outlined"
                        fullWidth
                    />
                </Box>
                <Box sx={{ width: '48%' }}>
                    <Typography variant="h6" gutterBottom>JD</Typography>
                    <Typography variant="p" gutterBottom>Copy / Paste any job description here.</Typography>
                    <TextField
                        multiline
                        rows={10}
                        variant="outlined"
                        fullWidth
                    />
                </Box>
            </Box>
            <Button variant="contained" size="large" sx={{ width: '400px' }}>
                Begin Process
            </Button>
            <br></br>
            <Typography variant="p" gutterBottom>The "process" aligns your resume with this JD. It takes a minute or 2, so go put on some coffee.</Typography>
        </Box>
    );
};

export default Workspace;
