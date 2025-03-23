// import React from 'react';
// import {
//     Box,
//     Typography,
// } from '@mui/material';

// const PricingCompTable = () => {
    
//     return (
//         <Box py={4}>
//         <Typography variant="h5" gutterBottom>
//         Compare and Choose the Right Plan for You
//         </Typography>
//         <table
//         style={{
//             margin: '0 auto',
//             textAlign: 'center',
//             borderCollapse: 'collapse', // Ensures no double borders
//             width: '100%', // Adjusts table width to full container
//         }}
//         >
//         <thead>
//         <tr>
//         <th style={{ border: '2px solid #555', padding: '8px' }}>Plan</th>
//         <th style={{ border: '2px solid #555', padding: '8px' }}>Credits/Month</th>
//         <th style={{ border: '2px solid #555', padding: '8px' }}>Cost Per Credit</th>
//         <th style={{ border: '2px solid #555', padding: '8px' }}>Best For</th>
//         </tr>
//         </thead>
//         <tbody>
//         <tr>
//         <td style={{ border: '2px solid #555', padding: '8px' }}>Standard</td>
//         <td style={{ border: '2px solid #555', padding: '8px' }}>50</td>
//         <td style={{ border: '2px solid #555', padding: '8px' }}>$0.10</td>
//         <td style={{ border: '2px solid #555', padding: '8px' }}>Casual Job Seekers</td>
//         </tr>
//         <tr>
//         <td style={{ border: '2px solid #555', padding: '8px' }}>Silver</td>
//         <td style={{ border: '2px solid #555', padding: '8px' }}>500</td>
//         <td style={{ border: '2px solid #555', padding: '8px' }}>$0.05</td>
//         <td style={{ border: '2px solid #555', padding: '8px' }}>Motivated Professionals</td>
//         </tr>
//         <tr>
//         <td style={{ border: '2px solid #555', padding: '8px' }}>Gold</td>
//         <td style={{ border: '2px solid #555', padding: '8px' }}>1500</td>
//         <td style={{ border: '2px solid #555', padding: '8px' }}>$0.03</td>
//         <td style={{ border: '2px solid #555', padding: '8px' }}>Coaches and Career Changers</td>
//         </tr>
//         </tbody>
//         </table>
//         </Box>
//     );
// }

// export default PricingCompTable;

import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer
} from '@mui/material';

const PricingCompTable = () => {
  return (
    <Box py={6}>
      <Typography variant="h5" gutterBottom>
        Compare and Choose the Right Plan for You
      </Typography>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Plan</strong></TableCell>
              <TableCell align="center"><strong>Credits / Month</strong></TableCell>
              <TableCell align="center"><strong>Cost Per Credit</strong></TableCell>
              <TableCell align="center"><strong>Best For</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Standard</TableCell>
              <TableCell align="center">50</TableCell>
              <TableCell align="center">$0.10</TableCell>
              <TableCell align="center">Casual Job Seekers</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Silver</TableCell>
              <TableCell align="center">500</TableCell>
              <TableCell align="center">$0.05</TableCell>
              <TableCell align="center">Motivated Professionals</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gold</TableCell>
              <TableCell align="center">1500</TableCell>
              <TableCell align="center">$0.03</TableCell>
              <TableCell align="center">Coaches and Career Changers</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PricingCompTable;
