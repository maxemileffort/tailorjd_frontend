import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@mui/material';
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
        <AccordionSummary sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Rewriter</Typography>
          <IconButton>
            {rewriterExpanded ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </AccordionSummary>
        <AccordionDetails>
          <Rewriter />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={drafterExpanded} onChange={toggleDrafter}>
        <AccordionSummary sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Drafter</Typography>
          <IconButton>
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
