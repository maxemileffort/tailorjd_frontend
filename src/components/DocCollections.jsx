import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';

const DocCollections = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">Document Collections</Typography>
            <List>
                <ListItem>Document 1</ListItem>
                <ListItem>Document 2</ListItem>
                <ListItem>Document 3</ListItem>
            </List>
        </Box>
    );
};

export default DocCollections;
