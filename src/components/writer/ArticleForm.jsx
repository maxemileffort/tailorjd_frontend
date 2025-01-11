import React from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';

const ArticleForm = ({ articleData, authors, onChange, onSubmit, errors }) => {
    
    
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        onChange(name, value); // Pass the change up to the parent component
    };
    
    // Automatically generates a slug based on title
    const handleTitleBlur = (event) => {
        const { value } = event.target;
        // Generate a slug from the title
        const slugValue = value
        .trim() // Remove leading/trailing spaces
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
        
        onChange('slug', slugValue);
    };
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '100%', mx: 3 }}>
        <TextField
        label="Title"
        name="title"
        value={articleData.title || ''}
        onChange={handleChange}
        onBlur={handleTitleBlur}
        error={!!errors.title}
        helperText={errors.title}
        fullWidth
        required
        />
        <TextField
        label="Slug"
        name="slug"
        value={articleData.slug || ''}
        onChange={handleChange}
        error={!!errors.slug}
        helperText={errors.slug}
        fullWidth
        required
        />
        <TextField
        label="Body"
        name="content"
        value={articleData.content || ''}
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
        value={articleData.metaTitle || ''}
        onChange={handleChange}
        fullWidth
        />
        <TextField
        label="Meta Description"
        name="metaDescription"
        value={articleData.metaDescription || ''}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        />
        <TextField
        label="Schema Markup"
        name="schemaMarkup"
        value={articleData.schemaMarkup || ''}
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
        value={articleData.authorId || ''}
        onChange={handleChange}
        error={!!errors.authorId}
        helperText={errors.authorId}
        fullWidth
        required
        >
        {authors.map((author) => (
            <MenuItem key={author.id} value={author.id}>
            {author.email} {/* Use author.name if available */}
            </MenuItem>
        ))}
        </TextField>
        <Button variant="contained" color="primary" onClick={onSubmit}>
        Submit Article
        </Button>
        </Box>
    );
};

export default ArticleForm;
