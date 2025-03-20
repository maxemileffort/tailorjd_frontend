import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const videos = [
    {
        title: "Getting Started with the Platform",
        url: "https://www.youtube.com/embed/example1", // Replace "example1" with the actual video ID
    },
    {
        title: "Navigating the Dashboard",
        url: "https://www.youtube.com/embed/example2", // Replace "example2" with the actual video ID
    },
    {
        title: "Customizing Your Profile",
        url: "https://www.loom.com/embed/example3", // Replace "example3" with the actual Loom video ID
    },
    {
        title: "Advanced Features and Tips",
        url: "https://www.youtube.com/embed/example4", // Replace "example4" with the actual video ID
    },
];

const Learning = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Learning
            </Typography>
            <Typography variant="body1" gutterBottom>
                Welcome to the Learning section! Here you can find various resources to enhance your skills.
            </Typography>
            <Typography variant="h6" gutterBottom>
                Video Tutorials:
            </Typography>
            <Grid container spacing={2}>
                {videos.map((video, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <Typography variant="subtitle1" gutterBottom>
                            {video.title}
                        </Typography>
                        <Box
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                paddingTop: '56.25%', // 16:9 aspect ratio
                            }}
                        >
                            <iframe
                                src={video.url}
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
                ))}
            </Grid>
        </Box>
    );
};

export default Learning;
