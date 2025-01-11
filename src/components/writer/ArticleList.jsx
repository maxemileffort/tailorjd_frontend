import React, { useState, useEffect } from 'react';
import { Box, TextField, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axiosInstance from '../../api/axiosInstance';

const ArticleList = ({ onSelect }) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axiosInstance.get('/articles');
        setArticles(response.data);
        setFilteredArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredArticles(
      articles.filter((article) =>
        article.title.toLowerCase().includes(term)
      )
    );
  };

  return (
    <Box sx={{ maxHeight: 300, overflowY: 'auto', mb: 2 }}>
      <TextField
        label="Search Articles"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
        sx={{ mb: 2 }}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {filteredArticles.map((article) => (
            <ListItem
              key={article.id}
              button
              onClick={() => onSelect(article)}
            >
              <ListItemText primary={article.title} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ArticleList;
