// import React, { useState, useEffect } from 'react';
// import { Box, Typography, CircularProgress, Grid, Card, CardContent, CardActionArea } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../api/axiosInstance';
// import Navbar from '../components/Navbar';

// const Blog = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const fetchArticles = async (page) => {
//     console.log(`Page: ${page}`);
//     setLoading(true);
//     setError(null); // Reset error state
//     try {
//       const response = await axiosInstance.get(`/articles?page=${page}&limit=10`);
//       if (page > 1 && response.data.length < 10) {
//         setHasMore(false); // No more articles to load
//       } else {
//         setArticles((prev) => [...prev, ...response.data]);
//         setHasMore(true); // check for more articles
//       }
//     } catch (error) {
//       console.error('Error fetching articles:', error);
//       setError('Failed to load articles. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchArticles(page);
//   }, [page]);

//   const loadMore = () => {
//     if (hasMore && !loading) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   // const handleCardClick = (id) => {
//   //   navigate(`/blog/${id}`);
//   // };
  
//   const handleCardClick = (slug) => {
//     navigate(`/blog/${slug}`);
//   };

//   return (
//     <Box>
//       <Navbar />
//       <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Blog
//         </Typography>
//         {error && <Typography color="error">{error}</Typography>}
//         <Grid container spacing={2}>
//           {articles.map((article) => (
//             <Grid item xs={12} sm={6} md={4} key={article.id}>
//               <Card>
//                 <CardActionArea onClick={() => handleCardClick(article.slug)}>
//                   <CardContent>
//                     <Typography variant="h6">{article.title}</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {article.metaDescription}
//                     </Typography>
//                   </CardContent>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//         {loading && <CircularProgress sx={{ mt: 2 }} />}
//         {hasMore && !loading && (
//           <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
//             <Typography
//               onClick={loadMore}
//               sx={{
//                 cursor: 'pointer',
//                 color: 'primary.main',
//                 textDecoration: 'underline',
//               }}
//             >
//               Load more
//             </Typography>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Blog;


import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, CircularProgress, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Navbar from '../components/Navbar';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Ref to detect first mount and skip double-invocation in development
  const didMountRef = useRef(false);

  const fetchArticles = async (pageNumber) => {
    console.log(`Page: ${pageNumber}`);
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axiosInstance.get(`/articles?page=${pageNumber}&limit=10`);
      if (pageNumber > 1 && response.data.length < 10) {
        setHasMore(false); // No more articles to load
      } else {
        setArticles((prev) => [...prev, ...response.data]);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to load articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If we’re already past the first mount, do the fetch call
    if (didMountRef.current) {
      fetchArticles(page);
    } else {
      // Mark that we have mounted once
      didMountRef.current = true;
    }
  }, [page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const handleCardClick = (slug) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <Box>
      <Navbar />
      <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 4, mb:4 }}>
        <Typography variant="h4" gutterBottom>
          Blog
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Grid container spacing={2}>
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(article.slug)}>
                  <CardContent>
                    <Typography variant="h6">{article.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.metaDescription}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        {loading && <CircularProgress sx={{ mt: 2 }} />}
        {hasMore && !loading && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Typography
              onClick={loadMore}
              sx={{
                cursor: 'pointer',
                color: 'secondary.main',
                textDecoration: 'underline',
              }}
            >
              Load more
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Blog;
