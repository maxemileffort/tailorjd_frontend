// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Box,
//   Button,
//   Typography,
// } from '@mui/material';

// const NotificationBar = ({ creditBalance, adminMessage }) => {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         backgroundColor: '#f5f5f5',
//         p: 2,
//         borderBottom: '1px solid #ddd',
//       }}
//     >
//       {/* Credit Balance */}
//       <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//         Credits: {creditBalance}
//       </Typography>

//       {/* Buy Credits Button */}
//       <Button
//         className="notification-bar-buy-credits"
//         component={Link}
//         to='/pricing'
//         variant="contained"
//         color="primary"
//         sx={{ ml: 2 }}
//       >
//         Buy Credits
//       </Button>

//       {/* Admin Message */}
//       <Typography
//         variant="body2"
//         sx={{
//           flexGrow: 1,
//           textAlign: 'center',
//           color: '#333',
//           ml: 4,
//           overflow: 'hidden',
//           whiteSpace: 'nowrap',
//           textOverflow: 'ellipsis',
//           fontWeight: 'bold',
//         }}
//       >
//         {adminMessage || 'No new messages.'}
//       </Typography>
//     </Box>
//   );
// };

// export default NotificationBar;

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';

const NotificationBar = ({ creditBalance, adminMessage, messageDestination }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        p: 2,
        borderBottom: '1px solid #ddd',
      }}
    >
      {/* Credit Balance */}
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        Credits: {creditBalance}
      </Typography>

      {/* Buy Credits Button */}
      <Button
        className="notification-bar-buy-credits"
        component={Link}
        to="/pricing"
        variant="contained"
        color="primary"
        sx={{ ml: 2 }}
      >
        Buy Credits
      </Button>

      {/* Admin Message */}
      {adminMessage ? (
        <Typography
          component={Link}
          to={messageDestination || '#'}
          variant="body2"
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            color: '#1976d2',
            ml: 4,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            fontWeight: 'bold',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          {adminMessage}
        </Typography>
      ) : (
        <Typography
          variant="body2"
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            color: '#333',
            ml: 4,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            fontWeight: 'bold',
          }}
        >
          No new messages.
        </Typography>
      )}
    </Box>
  );
};

export default NotificationBar;
