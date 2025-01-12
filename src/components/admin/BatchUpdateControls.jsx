import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const BatchUpdateControls = ({ batchCredits, onBatchCreditChange, onBatchUpdate }) => (
  <Box mt={4}>
    <Typography variant="h6">Batch Update Credits</Typography>
    <TextField
      type="number"
      size="small"
      value={batchCredits}
      onChange={(e) => onBatchCreditChange(parseInt(e.target.value, 10))}
      placeholder="Enter credit amount"
      sx={{ marginRight: 2 }}
    />
    <Button variant="contained" color="secondary" onClick={onBatchUpdate}>
      Apply to Selected Users
    </Button>
  </Box>
);

export default BatchUpdateControls;
