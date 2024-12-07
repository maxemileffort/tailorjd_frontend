import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import axiosInstance from '../api/axiosInstance'; // Adjust the path accordingly

const DocCollections = () => {
  const [collections, setCollections] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prettyPrint, setPrettyPrint] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

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

  const handleTogglePrettyPrint = () => setPrettyPrint((prev) => !prev);

  const handleToggleSortOrder = () => {
    setSortAscending((prev) => !prev);
    setCollections((prevCollections) =>
      [...prevCollections].sort((a, b) =>
        sortAscending
          ? new Date(b.createdAt) - new Date(a.createdAt) // Sort descending
          : new Date(a.createdAt) - new Date(b.createdAt) // Sort ascending
      )
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      {selectedDoc ? (
        // Render the selected document
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'sticky',
              top: 0,
              backgroundColor: 'white',
              zIndex: 1,
              paddingBottom: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={() => setSelectedDoc(null)}
            >
              Back
            </Button>
            <FormControlLabel
              control={
                <Switch
                  checked={prettyPrint}
                  onChange={handleTogglePrettyPrint}
                  color="primary"
                />
              }
              label="Pretty Print"
            />
          </Box>
          <Box
            sx={{
              maxWidth: '100%',
              margin: '0 auto',
              padding: 2,
              overflowX: 'hidden',
              wordWrap: 'break-word',
            }}
          >
            <Typography variant="h4" gutterBottom>
              {selectedDoc.docType.replace('_', ' ')}
            </Typography>
            {prettyPrint ? (
              <Box
                sx={{
                  padding: 2,
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <ReactMarkdown>{selectedDoc.content}</ReactMarkdown>
              </Box>
            ) : (
              <Typography
                variant="body1"
                component="pre"
                sx={{
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                }}
              >
                {selectedDoc.content}
              </Typography>
            )}
          </Box>
        </Box>
      ) : (
        // Render the list of collections
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Document Collections
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={!sortAscending}
                  onChange={handleToggleSortOrder}
                  color="primary"
                />
              }
              label="Sort Most Recent First"
            />
          </Box>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            collections.map((collection) => (
              <Box key={collection.id} sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Collection - {collection.collectionName}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Created At: {new Date(collection.createdAt).toLocaleString()}
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
