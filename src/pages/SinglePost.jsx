// import React, { useState, useEffect } from 'react';
// import { Box, Typography, CircularProgress } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import axiosInstance from '../api/axiosInstance';
// import Navbar from '../components/Navbar';

// const SingleBlogPost = () => {
  //   const { id } = useParams();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
  //     const fetchArticle = async () => {
    //       try {
//         const response = await axiosInstance.get(`/articles/${id}`);
//         setArticle(response.data);
//       } catch (error) {
//         console.error('Error fetching article:', error);
//       }
//       setLoading(false);
//     };

//     fetchArticle();
//   }, [id]);

//   if (loading) return <CircularProgress sx={{ mt: 4 }} />;

//   if (!article) {
//     return (
//       <Typography variant="h6" sx={{ mt: 4 }}>
//         Article not found.
//       </Typography>
//     );
//   }

//   // Convert dates to readable format
//   const createdDate = new Date(article.createdAt).toLocaleDateString();
//   const updatedDate = new Date(article.updatedAt).toLocaleDateString();

//   return (
//     <Box>
//       <Navbar />
//       <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           {article.title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" gutterBottom>
//           By {article.author?.email || 'Unknown'}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" gutterBottom>
//           Written: {createdDate || 'Unknown'}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" gutterBottom>
//           Last Updated: {updatedDate || 'Unknown'}
//         </Typography>
//         <Typography variant="body1">{article.content}</Typography>
//       </Box>
//     </Box>
//   );
// };

// export default SingleBlogPost;


import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Navbar from '../components/Navbar';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const SingleBlogPost = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axiosInstance.get(`/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
      setLoading(false);
    };
    
    fetchArticle();
  }, [id]);
  
  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  
  if (!article) {
    return (
      <Typography variant="h6" sx={{ mt: 4, mb: 4 }}>
      Article not found.
      </Typography>
    );
  }
  
  // Convert dates to readable format
  const createdDate = new Date(article.createdAt).toLocaleDateString();
  const updatedDate = new Date(article.updatedAt).toLocaleDateString();
  
  return (
    <HelmetProvider>
    <Helmet>
    {/* Dynamic Page Title */}
    <title>{article.metaTitle || 'Article'}</title>
    
    {/* Meta Description */}
    <meta name="description" content={article.metaDescription || 'Read our article'} />
    
    {/* Structured Data (Schema Markup) */}
    {article.schemaMarkup && (() => {
      try {
        const schemaData = JSON.parse(article.schemaMarkup);
        return (
          <script type="application/ld+json">
          {JSON.stringify(schemaData, null, 2)}
          </script>
        );
      } catch (error) {
        console.error('Invalid schema markup JSON:', error);
        return null; // Gracefully handle the error by not rendering the script tag
      }
    })()}
    </Helmet>
    <Box>
    <Navbar />
    <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 4, mb: 4 }}>
    <Typography variant="h4" gutterBottom>
    {article.title}
    </Typography>
    <Typography variant="body2" color="text.secondary" gutterBottom>
    By {article.author?.email || 'Unknown'}
    </Typography>
    <Typography variant="body2" color="text.secondary" gutterBottom>
    Written: {createdDate || 'Unknown'}
    </Typography>
    <Typography variant="body2" color="text.secondary" gutterBottom>
    Last Updated: {updatedDate || 'Unknown'}
    </Typography>
    <Typography variant="body1">{article.content}</Typography>
    </Box>
    </Box>
    </HelmetProvider>
  );
};

export default SingleBlogPost;
