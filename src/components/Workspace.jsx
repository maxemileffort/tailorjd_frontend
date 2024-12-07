// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import Rewriter from './Rewriter';
// import Drafter from './Drafter';

// const Workspace = () => {
//   const [rewriterExpanded, setRewriterExpanded] = useState(false);
//   const [drafterExpanded, setDrafterExpanded] = useState(false);

//   const toggleRewriter = () => setRewriterExpanded((prev) => !prev);
//   const toggleDrafter = () => setDrafterExpanded((prev) => !prev);

//   return (
//     <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', p: 2 }}>
//       <Accordion expanded={rewriterExpanded} onChange={toggleRewriter}>
//         <AccordionSummary
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h6">Rewriter</Typography>
//           <IconButton onClick={toggleRewriter}>
//             {rewriterExpanded ? <RemoveIcon /> : <AddIcon />}
//           </IconButton>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Rewriter />
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={drafterExpanded} onChange={toggleDrafter}>
//         <AccordionSummary
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h6">Drafter</Typography>
//           <IconButton onClick={toggleDrafter}>
//             {drafterExpanded ? <RemoveIcon /> : <AddIcon />}
//           </IconButton>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Drafter />
//         </AccordionDetails>
//       </Accordion>
//     </Box>
//   );
// };

// export default Workspace;


import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Rewriter from './Rewriter';
import Drafter from './Drafter';

const Workspace = () => {
  const [rewriterExpanded, setRewriterExpanded] = useState(false);
  const [drafterExpanded, setDrafterExpanded] = useState(false);

  const toggleRewriter = () => setRewriterExpanded((prev) => !prev);
  const toggleDrafter = () => setDrafterExpanded((prev) => !prev);

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', p: 2 }}>
      <Accordion expanded={rewriterExpanded} onChange={toggleRewriter}>
        <AccordionSummary
          onClick={toggleRewriter} // Allow clicking the entire summary area
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Rewriter</Typography>
          <IconButton
            onClick={(e) => {
              // e.stopPropagation(); // Prevent event bubbling to AccordionSummary
              toggleRewriter();
            }}
          >
            {rewriterExpanded ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </AccordionSummary>
        <AccordionDetails>
          <Rewriter />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={drafterExpanded} onChange={toggleDrafter}>
        <AccordionSummary
          onClick={toggleDrafter} // Allow clicking the entire summary area
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Drafter</Typography>
          <IconButton
            onClick={(e) => {
              // e.stopPropagation(); // Prevent event bubbling to AccordionSummary
              toggleDrafter();
            }}
          >
            {drafterExpanded ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </AccordionSummary>
        <AccordionDetails>
          <Drafter />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Workspace;
