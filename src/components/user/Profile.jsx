import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
} from '@mui/material';
import axiosInstance from '../../api/axiosInstance';

// Import the new sub-components
import ProfileInfoForm from './ProfileInfoForm';
import ResumeSection from './ProfileResumeSection';
import ProfileActions from './ProfileActions';

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
    const [saving, setSaving] = useState(false); // Only for saving text fields via handleSave
    const [error, setError] = useState(null); // General errors for this component
    const [successMessage, setSuccessMessage] = useState(null); // General success messages

    // --- Effects ---

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
    }, []); // Only run on mount

    // --- Handlers ---

    // Handle input changes for text fields (passed to ProfileInfoForm)
    const handleChange = (field, value) => {
        setProfileData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
        // Clear messages on change
        if (successMessage) setSuccessMessage(null);
        if (error) setError(null);
    };

    // Handle updates to resume text coming from ResumeSection
    const handleResumeUpdate = useCallback((newResumeText) => {
        setProfileData((prevData) => ({
            ...prevData,
            currentResume: newResumeText,
        }));
         // Clear messages on change
        if (successMessage) setSuccessMessage(null);
        if (error) setError(null);
    }, [successMessage, error]); // Include dependencies that might clear messages

    // Save profile data (only text fields managed by this component)
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

    // Reset profile data (refetch from server for consistency)
    const handleReset = async () => {
        setLoading(true); // Show loading indicator while refetching
        setSuccessMessage(null);
        setError(null);
        try {
            const token = sessionStorage.getItem('jwtToken');
            if (!token) { window.location.href = '/login'; return; }
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get('/users/demographics');
            setProfileData(response.data);
        } catch (err) {
            console.error('Error refetching profile data on reset:', err);
            setError('Failed to reload profile data.');
            // Optionally keep old data or set to default
            // setProfileData(defaultProfileData);
        } finally {
            setLoading(false);
        }
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

            {/* Display general errors/success messages */}
            {error && (
                <Alert severity="error" sx={{ marginBottom: 2 }} onClose={() => setError(null)}>
                {error}
                </Alert>
            )}
            {successMessage && (
                <Alert severity="success" sx={{ marginBottom: 2 }} onClose={() => setSuccessMessage(null)}>
                {successMessage}
                </Alert>
            )}

            {/* Render sub-components */}
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ProfileInfoForm
                    profileData={profileData}
                    handleChange={handleChange}
                    disabled={saving} // Disable form while saving text changes
                />

                <ResumeSection
                    // Pass only the initial resume text. ResumeSection manages its own text state.
                    initialResumeText={profileData.currentResume}
                    // Callback to update the main profileData state when resume text changes (e.g., after upload/parse)
                    onResumeUpdate={handleResumeUpdate}
                    // Disable resume section if main profile text fields are saving
                    disabled={saving}
                />

                <ProfileActions
                    onSave={handleSave}
                    onReset={handleReset}
                    isSaving={saving}
                    // isUploading is managed within ResumeSection, actions only care about parent saving state
                />
            </Box>
            </Box>
        );
    };

    export default Profile;
