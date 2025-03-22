import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const videos = [
    {
        title: "Getting Started & Navigating the Platform",
        url: "https://www.youtube.com/watch?v=9CTlGLtOPYY", 
    },
    {
        title: "Customizing Your Profile",
        url: "https://www.loom.com/embed/example3",
    },
    {
        title: "Basic Workflows - Rewriter",
        url: "", 
    },
    {
        title: "Basic Workflows - Drafter",
        url: "", 
    },
    {
        title: "Basic Workflows - Bullet Rewriter",
        url: "", 
    },
    {
        title: "Basic Workflows - Doc Collections",
        url: "", 
    },
];

const getEmbedUrl = (url) => {
    if (!url) return null;

    if (url.includes('youtube.com/watch')) {
        const videoId = new URL(url).searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}`;
    }

    return url; // Return Loom or already embeddable links as-is
};

const Learning = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Learning
            </Typography>
            <Typography variant="body1" gutterBottom>
                Welcome to the Learning section! Here you can find various resources to enhance your user experience.
            </Typography>
            <Typography variant="h6" gutterBottom>
                Video Tutorials:
            </Typography>
            <Grid container spacing={2}>
                {videos.map((video, index) => {
                    const embedUrl = getEmbedUrl(video.url);
                    if (!embedUrl) return null;

                    return (
                        <Grid item xs={12} md={6} key={index}>
                            <Typography variant="subtitle1" gutterBottom>
                                {video.title}
                            </Typography>
                            <Box
                                sx={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    paddingTop: '56.25%',
                                }}
                            >
                                <iframe
                                    src={embedUrl}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                ></iframe>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default Learning;
