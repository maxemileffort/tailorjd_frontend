import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Typography, Alert } from '@mui/material';
import axiosInstance from '../../api/axiosInstance';

const WriteArticlesComponent = () => {
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    schemaMarkup: '',
    authorId: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');

  // Fetch authors when the component mounts
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axiosInstance.get('/users/writers'); // Use axiosInstance
        setAuthors(response.data.filter(el => ['ADMIN', 'WRITER'].includes(el.role)));
        console.log(authors);
      } catch (error) {
        console.error('Error fetching authors:', error);
        setServerError('Failed to load authors. Please try again later.');
      }
    };

    fetchAuthors();
  }, []);

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear field-specific error when user types
    setServerError(''); // Clear server error on user interaction
    setServerSuccess(''); // Clear server success on user interaction
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required.';
    if (!formData.content) newErrors.content = 'Body is required.';
    if (!formData.schemaMarkup) newErrors.schemaMarkup = 'Schema Markup is required.';
    if (!formData.authorId) newErrors.authorId = 'Author selection is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return; // Prevent submission if validation fails
    try {
      const response = await axiosInstance.post('/articles', formData); // Use axiosInstance
      console.log('Article created successfully:', response.data);
      setServerSuccess('Article created successfully!');
      setFormData({
        title: '',
        content: '',
        metaTitle: '',
        metaDescription: '',
        schemaMarkup: '',
        authorId: '',
      });
      setServerError('');
    } catch (error) {
      console.error('Error creating article:', error);
      setServerError('Failed to create article. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Write a New Article
      </Typography>
      {serverError && <Alert severity="error">{serverError}</Alert>}
      {serverSuccess && <Alert severity="info">{serverSuccess}</Alert>}
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
        fullWidth
        required
      />
      <TextField
        label="Body"
        name="content"
        value={formData.content}
        onChange={handleChange}
        error={!!errors.content}
        helperText={errors.content}
        fullWidth
        multiline
        rows={6}
        required
      />
      <TextField
        label="Meta Title"
        name="metaTitle"
        value={formData.metaTitle}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Meta Description"
        name="metaDescription"
        value={formData.metaDescription}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
      />
      <TextField
        label="Schema Markup"
        name="schemaMarkup"
        value={formData.schemaMarkup}
        onChange={handleChange}
        error={!!errors.schemaMarkup}
        helperText={errors.schemaMarkup}
        fullWidth
        multiline
        rows={3}
        required
      />
      <TextField
        select
        label="Author"
        name="authorId"
        value={formData.authorId}
        onChange={handleChange}
        error={!!errors.authorId}
        helperText={errors.authorId}
        fullWidth
        required
      >
        {authors.map((author) => (
          <MenuItem key={author.id} value={author.id}>
            {author.email} {/* Use another field like `author.name` if available */}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Article
      </Button>
    </Box>
  );
};

export default WriteArticlesComponent;
