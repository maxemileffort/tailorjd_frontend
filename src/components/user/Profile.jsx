import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    TextareaAutosize,
    Button,
    CircularProgress,
    Alert,
    Input, // Added for file input styling
    FormControl, // Added for form structure
    FormLabel, // Added for accessibility
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
    const [saving, setSaving] = useState(false); // For text field saving
    const [uploading, setUploading] = useState(false); // For file upload saving
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null); // State for the selected file
    const fileInputRef = React.useRef(null); // Ref for the file input

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
    
    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setSelectedFile(file);
            setError(null); // Clear previous errors
        } else {
            setSelectedFile(null);
            setError('Invalid file type. Please select a PDF or DOCX file.');
        }
    };

    // Handle file upload
    const handleFileUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file to upload.');
            return;
        }

        setUploading(true);
        setSuccessMessage(null);
        setError(null);

        const formData = new FormData();
        formData.append('resume', selectedFile); // 'resume' should match the backend field name

        try {
            const token = sessionStorage.getItem('jwtToken');
            if (!token) {
                window.location.href = '/login';
                return;
            }

            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.put('/users/resume/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Update the resume text field with the parsed content from the backend
            setProfileData((prevData) => ({
                ...prevData,
                currentResume: response.data.resumeText,
            }));
            setSuccessMessage(response.data.message || 'Resume uploaded and parsed successfully!');
            setSelectedFile(null); // Clear the selected file state
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Clear the file input visually
            }
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'Failed to upload resume.';
            console.error('Error uploading resume:', err);
            setError(errorMsg);
        } finally {
            setUploading(false);
        }
    };

    // Handle input changes for text fields
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

            {/* Resume Section */}
            <Typography variant="h6" sx={{ marginTop: 2 }}>Resume</Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Paste your resume text below, or upload a PDF/DOCX file to automatically parse and save the text.
            </Typography>

            {/* File Upload Input */}
             <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <FormLabel sx={{ marginBottom: 1 }}>Upload Resume (PDF or DOCX)</FormLabel>
                <Input
                    type="file"
                    inputRef={fileInputRef} // Assign ref
                    onChange={handleFileChange}
                    inputProps={{ accept: '.pdf,.docx' }} // Specify accepted file types
                    sx={{ marginBottom: 1 }}
                />
                {selectedFile && (
                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                        Selected file: {selectedFile.name}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleFileUpload}
                    disabled={!selectedFile || uploading || saving} // Disable if no file, uploading, or saving text fields
                    sx={{ alignSelf: 'flex-start' }} // Align button to the left
                >
                    {uploading ? <CircularProgress size={24} /> : 'Upload Resume'}
                </Button>
            </FormControl>

            {/* Resume Text Area */}
            <TextField
            label="Current Resume Text"
            value={profileData.currentResume}
            onChange={(e) => handleChange('currentResume', e.target.value)}
            multiline
            rows={10}
            fullWidth
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={saving || uploading} // Disable if saving text or uploading file
            >
            {saving ? <CircularProgress size={24} /> : 'Save Text Changes'}
            </Button>
            <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            disabled={saving || uploading} // Disable if saving text or uploading file
            >
            Reset Fields
            </Button>
            </Box>
            </Box>
            </Box>
        );
    };
    
    export default Profile;
