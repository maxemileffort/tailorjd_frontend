import React from 'react';
import {
    Box,
    Typography,
} from '@mui/material';

const PricingCompTable = () => {
    
    return (
        <Box py={4}>
        <Typography variant="h5" gutterBottom>
        Compare and Choose the Right Plan for You
        </Typography>
        <table
        style={{
            margin: '0 auto',
            textAlign: 'center',
            borderCollapse: 'collapse', // Ensures no double borders
            width: '100%', // Adjusts table width to full container
        }}
        >
        <thead>
        <tr>
        <th style={{ border: '2px solid #555', padding: '8px' }}>Plan</th>
        <th style={{ border: '2px solid #555', padding: '8px' }}>Credits/Month</th>
        <th style={{ border: '2px solid #555', padding: '8px' }}>Cost Per Credit</th>
        <th style={{ border: '2px solid #555', padding: '8px' }}>Best For</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td style={{ border: '2px solid #555', padding: '8px' }}>Standard</td>
        <td style={{ border: '2px solid #555', padding: '8px' }}>5</td>
        <td style={{ border: '2px solid #555', padding: '8px' }}>$1.00</td>
        <td style={{ border: '2px solid #555', padding: '8px' }}>Casual Job Seekers</td>
        </tr>
        <tr>
        <td style={{ border: '2px solid #555', padding: '8px' }}>Silver</td>
        <td style={{ border: '2px solid #555', padding: '8px' }}>50</td>
        <td style={{ border: '2px solid #555', padding: '8px' }}>$0.50</td>
        <td style={{ border: '2px solid #555', padding: '8px' }}>Motivated Professionals</td>
        </tr>
        <tr>
        <td style={{ border: '2px solid #555', padding: '8px' }}>Gold</td>
        <td style={{ border: '2px solid #555', padding: '8px' }}>150</td>
        <td style={{ border: '2px solid #555', padding: '8px' }}>$0.33</td>
        <td style={{ border: '2px solid #555', padding: '8px' }}>Coaches and Career Changers</td>
        </tr>
        </tbody>
        </table>
        </Box>
    );
}

export default PricingCompTable;