import React, { useState } from 'react';
import WriterSidebar from '../components/WriterSidebar';
import { Box, Typography } from '@mui/material';

const WriterPage = () => {
  const [selectedPage, setSelectedPage] = useState('articles');

  const renderContent = () => {
    switch (selectedPage) {
      case 'articles':
        return <Typography variant="h4">Write Articles</Typography>;
      case 'edit':
        return <Typography variant="h4">Edit Articles</Typography>;
      case 'publish':
        return <Typography variant="h4">Publish Articles</Typography>;
      default:
        return <Typography variant="h4">Write Articles</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <WriterSidebar onSelect={setSelectedPage} />
      <Box sx={{ flexGrow: 1, p: 3 }}>{renderContent()}</Box>
    </Box>
  );
};

export default WriterPage;
