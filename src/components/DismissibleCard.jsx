// // components/DismissibleCard.js
// import React, { useState } from 'react';
// import { Card, CardContent, IconButton, Box } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// const DismissibleCard = ({ children }) => {
//     const [visible, setVisible] = useState(true);

//     if (!visible) return null;

//     return (
//         <Box display="flex" justifyContent="center" my={2}>
//             <Card sx={{ width: '100%', maxWidth: 700, boxShadow: 3 }}>
//                 <CardContent sx={{ position: 'relative', p: 2 }}>
//                     <IconButton
//                         onClick={() => setVisible(false)}
//                         size="small"
//                         sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
//                     >
//                         <CloseIcon fontSize="small" />
//                     </IconButton>
//                     {children}
//                 </CardContent>
//             </Card>
//         </Box>
//     );
// };

// export default DismissibleCard;

// components/DismissibleCard.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DismissibleCard = ({ children, id = 'default-dismissible-card' }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(`dismissed-${id}`);
    if (dismissed === 'true') setVisible(false);
  }, [id]);

  const handleClose = () => {
    sessionStorage.setItem(`dismissed-${id}`, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Box display="flex" justifyContent="center" my={2}>
      <Card sx={{ width: '100%', maxWidth: 700, boxShadow: 3 }}>
        <CardContent sx={{ position: 'relative', p: 2 }}>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          {children}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DismissibleCard;
