import React from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance'


const BillingPortalButton = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const handleBillingPortalRedirect = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const token = sessionStorage.getItem('jwtToken');
            if (!token) {
                window.location.href = '/login';
                return;
            }
            
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const { data } = await axiosInstance.get('/users/billing')
            
            const { portalUrl } = response.data;
            
            if (portalUrl) {
                window.location.href = portalUrl; // Redirect to the Stripe portal
            } else {
                setError('Failed to retrieve billing portal URL.');
            }
        } catch (err) {
            console.error('Error fetching billing portal:', err);
            setError('An error occurred while creating the billing portal session.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
        <Button
        variant="contained"
        color="primary"
        onClick={handleBillingPortalRedirect}
        disabled={loading}
        startIcon={loading && <CircularProgress size={20} />}
        >
        {loading ? 'Redirecting...' : 'Go to Billing Portal'}
        </Button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

const Settings = () => {
    return (
        <Box sx={{ padding: 2 }}>
        <Typography variant="h4">Settings</Typography>
        <Typography variant="body1">
        Make changes to your account settings here.
        </Typography>
        <BillingPortalButton />
        </Box>
    );
};

export default Settings;
