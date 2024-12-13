import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material';
import axiosInstance from '../../api/axiosInstance';

const Profile = () => {
    const defaultProfileData = {
        f_name: '',
        l_name: '',
        jd_target: '',
        currentIndustry: '',
        currentResume: '',
    };
    
    const [profileData, setProfileData] = useState(defaultProfileData);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    
    // Fetch user profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = sessionStorage.getItem('jwtToken');
                if (!token) {
                    window.location.href = '/login';
                    return;
                }
                
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axiosInstance.get('/users/demographics');
                setProfileData(response.data);
            } catch (err) {
                console.error('Error fetching profile data:', err);
                setError('Failed to load profile data.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchProfile();
    }, []);
    
    // Handle input changes
    const handleChange = (field, value) => {
        setProfileData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };
    
    // Save profile data
    const handleSave = async () => {
        setSaving(true);
        setSuccessMessage(null);
        setError(null);
        
        try {
            const token = sessionStorage.getItem('jwtToken');
            if (!token) {
                window.location.href = '/login';
                return;
            }
            
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axiosInstance.put('/users/demographics', profileData);
            setSuccessMessage('Profile updated successfully!');
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'Failed to save profile data.';
            console.error('Error saving profile data:', err);
            setError(errorMsg);
        } finally {
            setSaving(false);
        }
    };
        
        // Reset profile data
        const handleReset = () => {
            setProfileData(defaultProfileData);
            setSuccessMessage(null);
            setError(null);
        };
        
        if (loading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
                </Box>
            );
        }
        
        return (
            <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
            Profile
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Edit your personal information below.
            </Typography>
            
            {error && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                {error}
                </Alert>
            )}
            
            {successMessage && (
                <Alert severity="success" sx={{ marginBottom: 2 }}>
                {successMessage}
                </Alert>
            )}
            
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
            label="First Name"
            value={profileData.f_name}
            onChange={(e) => handleChange('f_name', e.target.value)}
            fullWidth
            />
            <TextField
            label="Last Name"
            value={profileData.l_name}
            onChange={(e) => handleChange('l_name', e.target.value)}
            fullWidth
            />
            <Typography variant="body1">What job descriptions are you targeting for new employment?</Typography>
            <TextField
            label="Job Description Target"
            value={profileData.jd_target}
            onChange={(e) => handleChange('jd_target', e.target.value)}
            fullWidth
            />
            <Typography variant="body1">What job category does your current work fall under?</Typography>
            <TextField
            label="Current Industry"
            value={profileData.currentIndustry}
            onChange={(e) => handleChange('currentIndustry', e.target.value)}
            fullWidth
            />
            <Typography variant="body1">You can save a rez here, and it will pre-populate in the workflows.</Typography>
            <TextField
            label="Current Resume"
            value={profileData.currentResume}
            onChange={(e) => handleChange('currentResume', e.target.value)}
            multiline
            rows={4}
            fullWidth
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={saving}
            >
            {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            disabled={saving}
            >
            Reset
            </Button>
            </Box>
            </Box>
            </Box>
        );
    };
    
    export default Profile;
    