import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Typography,
    Button,
    Grid2,
    Card,
    CardContent,
    CardActions,
  } from '@mui/material';

const ALaCarteCards = () => {
    const navigate = useNavigate();

    return (
        <Box py={6}>
          <Typography variant="h4" gutterBottom>
            Need More Flexibility? Go A La Carte!
          </Typography>
          <Grid2 container spacing={4} justifyContent="center">
            {/* 10 Credits */}
            <Grid2 item xs={12} sm={6} md={4}>
              <Card elevation={3} sx={{ height: '100%', width: '275px' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    10 Credits
                  </Typography>
                  <Typography color="textSecondary" paragraph>
                    $12
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Ideal for occasional use.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => navigate('/checkout?credits=10')}
                  >
                    Buy Now
                  </Button>
                </CardActions>
              </Card>
            </Grid2>

            {/* 50 Credits */}
            <Grid2 item xs={12} sm={6} md={4}>
              <Card elevation={3} sx={{ height: '100%', width: '275px' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    50 Credits
                  </Typography>
                  <Typography color="textSecondary" paragraph>
                    $50
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Perfect for short bursts of activity.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate('/checkout?credits=50')}
                  >
                    Buy Now
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          </Grid2>
        </Box>
    );
}



export default ALaCarteCards;