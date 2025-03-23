// components/VideoPlayer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch')) {
        const videoId = new URL(url).searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
};

const VideoPlayer = ({ title, url }) => {
    const embedUrl = getEmbedUrl(url);
    if (!embedUrl) return null;

    return (
        <Box>
            <Typography variant="subtitle1" gutterBottom>
                {title}
            </Typography>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '56.25%',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                <iframe
                    src={embedUrl}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0,
                    }}
                ></iframe>
            </Box>
        </Box>
    );
};

export default VideoPlayer;
