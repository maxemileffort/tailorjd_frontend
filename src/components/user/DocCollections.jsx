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
  TextField,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import EditIcon from '@mui/icons-material/Edit'
import axiosInstance from '../../api/axiosInstance'; // Adjust the path accordingly

const DocCollections = () => {
  const [collections, setCollections] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prettyPrint, setPrettyPrint] = useState(true);
  const [sortAscending, setSortAscending] = useState(true);
  const [editingCollectionId, setEditingCollectionId] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState('');

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
          window.location.href = '/login';
          return;
        }
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axiosInstance.get('/rewrites/doc-collections');
        const respCollections = response.data.collections;
        const sortedDescending = [...respCollections].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCollections(sortedDescending);

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
          ?  new Date(a.createdAt) - new Date(b.createdAt) // Sort ascending
          : new Date(b.createdAt) - new Date(a.createdAt) // Sort descending 
      )
    );
  };

  const handleCollectionNameDoubleClick = (collection) => {
    setEditingCollectionId(collection.id);
    setNewCollectionName(collection.collectionName);
  };

  const handleCollectionNameBlur = async (collectionId) => {
    if (newCollectionName.trim() === '') {
      setEditingCollectionId(null);
      return;
    }

    try {
      await axiosInstance.put('/rewrites/doc-collections/update', {
        id: collectionId,
        newName: newCollectionName,
      });

      setCollections((prevCollections) =>
        prevCollections.map((collection) =>
          collection.id === collectionId
            ? { ...collection, collectionName: newCollectionName }
            : collection
        )
      );
    } catch (err) {
      console.error('Error updating collection name:', err);
      setError('An error occurred while updating the collection name.');
    } finally {
      setEditingCollectionId(null);
    }
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
              backgroundColor: '#f5f5f5',
              zIndex: 1,
              paddingBottom: 1,
            }}
          >
            <Button variant="contained" onClick={() => setSelectedDoc(null)}>
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
                  checked={sortAscending}
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
                {editingCollectionId === collection.id ? (
                  <TextField
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    onBlur={() => handleCollectionNameBlur(collection.id)}
                    autoFocus
                    fullWidth
                  />
                ) : (
                  <Box sx={{display: "flex"}}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    onDoubleClick={() => handleCollectionNameDoubleClick(collection)}
                    sx={{ cursor: 'pointer', mr: 2 }}
                  >
                    Collection - {collection.collectionName}
                  </Typography>

                  {/* Edit icon for mobile devices */}
                  <Box
                  onClick={() => handleCollectionNameDoubleClick(collection)}
                  sx={{ cursor: 'pointer' }}
                >
                  <EditIcon color="primary" />
                </Box>
                </Box>
                )}
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
