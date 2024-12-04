import React from 'react';
import {
    Box,
    Typography,
} from '@mui/material';

const SimpleFooter = () => {
    return(
        <Box mt={4} textAlign="right"> {/* Right-align footer */}
            <Typography variant="body2" color="textSecondary">
                © {new Date().getFullYear()} TailorJD. All rights reserved.
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Made with ❤️ by TailorJD Team
            </Typography>
        </Box>
    )
};

export default SimpleFooter;