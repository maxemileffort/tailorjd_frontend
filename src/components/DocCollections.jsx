// import React from 'react';
// import { Box, Typography, List, ListItem } from '@mui/material';

// const DocCollections = () => {
//     return (
//         <Box sx={{ padding: 2 }}>
//             <Typography variant="h4">Document Collections</Typography>
//             <List>
//                 <ListItem>Document 1</ListItem>
//                 <ListItem>Document 2</ListItem>
//                 <ListItem>Document 3</ListItem>
//             </List>
//         </Box>
//     );
// };

// export default DocCollections;


import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import axiosInstance from '../api/axiosInstance'; // Adjust the path accordingly

const DocCollections = () => {
  const [collections, setCollections] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          window.location.href = '/login';
          return;
        }
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axiosInstance.get('/rewrites/doc-collections');
        setCollections(response.data.collections);
      } catch (err) {
        console.error('Error fetching collections:', err);
        setError('An error occurred while fetching collections.');
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      {selectedDoc ? (
        // Render the selected document
        <Box>
          <Button
            variant="contained"
            onClick={() => setSelectedDoc(null)}
            sx={{ position: 'sticky', top: 0, mb: 2 }}
          >
            Back
          </Button>
          <Typography variant="h4" gutterBottom>
            {selectedDoc.docType.replace('_', ' ')}
          </Typography>
          <Typography variant="body1" component="pre">
            {selectedDoc.content}
          </Typography>
        </Box>
      ) : (
        // Render the list of collections
        <Box>
          <Typography variant="h4" gutterBottom>
            Document Collections
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            collections.map((collection) => (
              <Box key={collection.id} sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Collection {collection.id}
                </Typography>
                <Grid container spacing={2}>
                  {collection.docs.map((doc) => (
                    <Grid item xs={12} sm={6} md={4} key={doc.id}>
                      <Box
                        sx={{
                          border: '1px solid #ccc',
                          padding: 2,
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: '#f5f5f5' },
                        }}
                        onClick={() => setSelectedDoc(doc)}
                      >
                        <Typography variant="h6">
                          {doc.docType.replace('_', ' ')}
                        </Typography>
                        <Typography variant="body2">
                          {doc.content.substring(0, 100)}...
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default DocCollections;
