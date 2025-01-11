import React, { useState } from 'react';
import WriterSidebar from '../components/writer/WriterSidebar';
import WriteArticlesComponent from '../components/writer/WriteArticlesComponent';
import { Box, Typography } from '@mui/material';

const WriterPage = () => {
  const [selectedPage, setSelectedPage] = useState('articles');

  const renderContent = () => {
    switch (selectedPage) {
      case 'articles':
        return <WriteArticlesComponent />;
      case 'edit':
        return <Typography variant="h4">Edit Articles</Typography>;
      case 'manage':
        return <Typography variant="h4">Manage Articles</Typography>;
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
