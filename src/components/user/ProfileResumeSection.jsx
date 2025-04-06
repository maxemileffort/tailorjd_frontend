import React, { useState, useEffect, useRef } from 'react';
import {
    Box, Typography, TextField, Button, CircularProgress, Alert, Input,
    FormControl, FormLabel, Modal, List, ListItem, ListItemButton, ListItemIcon,
    ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
    Divider, Stack
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../api/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';

const ResumeSection = ({ initialResumeText, onResumeUpdate, disabled: parentDisabled }) => {
    const [currentResumeText, setCurrentResumeText] = useState(initialResumeText || '');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null); // Local error state for this section
    const [successMessage, setSuccessMessage] = useState(null); // Local success state

    // Google Drive State
    const [isGoogleConnected, setIsGoogleConnected] = useState(false); // Assume not connected initially
    const [showDriveModal, setShowDriveModal] = useState(false);
    const [driveFiles, setDriveFiles] = useState([]);
    const [driveLoading, setDriveLoading] = useState(false);
    const [driveError, setDriveError] = useState(null);
    const [driveSearchTerm, setDriveSearchTerm] = useState(''); // State for search input

    const fileInputRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Sync local resume text state if initial prop changes
    useEffect(() => {
        setCurrentResumeText(initialResumeText || '');
    }, [initialResumeText]);

    // Effect to check Google Auth status from URL and backend
     useEffect(() => {
        // Function to check connection status via backend API
        const checkGoogleConnectionStatus = async () => {
            try {
                const token = sessionStorage.getItem('jwtToken');
                if (!token) {
                    // Not logged in, so can't be connected
                    setIsGoogleConnected(false);
                    return;
                }
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axiosInstance.get('/auth/google/status');
                if (response.data.isConnected) {
                    setIsGoogleConnected(true);
                } else {
                    setIsGoogleConnected(false);
                }
            } catch (err) {
                console.error('Error checking Google connection status:', err);
                // Assume not connected if status check fails
                setIsGoogleConnected(false);
            }
        };

        // --- Logic to handle URL parameters after redirect ---
        const queryParams = new URLSearchParams(location.search);
        const googleAuthStatus = queryParams.get('google_auth');
        const message = queryParams.get('message');

        if (googleAuthStatus) {
            if (googleAuthStatus === 'success') {
                setSuccessMessage('Google Drive connected successfully!');
                setIsGoogleConnected(true);
            } else if (googleAuthStatus === 'error') {
                setError(`Google Drive connection failed: ${message || 'Unknown error'}`);
                setIsGoogleConnected(false);
            }
            // Clean up URL
            queryParams.delete('google_auth');
            queryParams.delete('message');
            navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
            // No need to call checkGoogleConnectionStatus here, as the success param already told us.
        } else {
             // If not coming directly from redirect, check status via API on mount
             checkGoogleConnectionStatus();
        }

    }, [location, navigate]); // Dependency array ensures this runs when URL changes (for redirect) and on mount


    const handleLocalResumeChange = (event) => {
        setCurrentResumeText(event.target.value);
        // Also update the parent's state immediately for the text area
        onResumeUpdate(event.target.value);
    };

    // Handle device file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setSelectedFile(file);
            setError(null);
        } else {
            setSelectedFile(null);
            setError('Invalid file type. Please select a PDF or DOCX file.');
        }
    };

    // Handle file upload (from device OR Google Drive Blob)
    const handleFileUpload = async (fileToUpload = selectedFile) => {
        if (!fileToUpload) {
            setError('No file selected for upload.');
            return;
        }
        if (!(fileToUpload instanceof File)) {
             setError('Invalid file data provided for upload.');
             console.error("Upload attempt with non-File object:", fileToUpload);
             return;
        }

        setUploading(true);
        setSuccessMessage(null);
        setError(null);
        setDriveError(null); // Clear drive error too

        const formData = new FormData();
        formData.append('resume', fileToUpload, fileToUpload.name);

        try {
            const token = sessionStorage.getItem('jwtToken');
            if (!token) { window.location.href = '/login'; return; }
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const response = await axiosInstance.put('/users/resume/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const newResumeText = response.data.resumeText;
            setCurrentResumeText(newResumeText); // Update local state
            onResumeUpdate(newResumeText); // Update parent state
            setSuccessMessage(response.data.message || 'Resume uploaded and parsed successfully!');
            setSelectedFile(null);
            if (fileInputRef.current) { fileInputRef.current.value = ''; }

        } catch (err) {
            const errorMsg = err.response?.data?.error || 'Failed to upload and parse resume.';
            console.error('Error uploading resume:', err);
            setError(errorMsg);
        } finally {
            setUploading(false);
        }
    };

    // --- Google Drive Handlers ---
    const handleConnectGoogleDrive = async () => {
        setError(null); // Clear previous errors
        setSuccessMessage(null);
        try {
            const token = sessionStorage.getItem('jwtToken');
            if (!token) { window.location.href = '/login'; return; }
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Call the new backend endpoint to get the auth URL
            const response = await axiosInstance.get('/auth/google/get-auth-url');
            const { authorizeUrl } = response.data;

            if (authorizeUrl) {
                // Redirect the user to Google's consent screen
                window.location.href = authorizeUrl;
            } else {
                setError('Could not get Google authorization URL.');
            }
        } catch (err) {
            console.error('Error initiating Google Drive connection:', err);
            setError(err.response?.data?.error || 'Failed to start Google Drive connection.');
        }
    };

    // Renamed and parameterized function to fetch drive files
    const fetchDriveFiles = async (searchTerm = '') => {
        setDriveLoading(true);
        setDriveError(null);
        setDriveFiles([]); // Clear previous files before fetching

        try {
            const token = sessionStorage.getItem('jwtToken');
            if (!token) { window.location.href = '/login'; return; }
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Pass the search term as a query parameter
            const response = await axiosInstance.get('/google-drive/files', {
                params: { nameQuery: searchTerm }
            });
            setDriveFiles(response.data || []);
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'Failed to fetch Google Drive files.';
            console.error('Error fetching Google Drive files:', err);
            setDriveError(errorMsg);
            if (err.response?.status === 401) {
                setIsGoogleConnected(false);
                setDriveError("Google Drive connection issue. Please reconnect.");
            }
        } finally {
            setDriveLoading(false);
        }
    };

    // Handler to open the modal and fetch initial files (without search term)
    const handleOpenDriveModal = () => {
        setShowDriveModal(true);
        setDriveSearchTerm(''); // Reset search term when opening
        fetchDriveFiles(); // Fetch initial list
    };

    const handleCloseDriveModal = () => {
        setShowDriveModal(false);
        setDriveError(null); // Clear errors
        setDriveSearchTerm(''); // Reset search term
    };

    // Handler for the search button click
    const handleDriveSearch = () => {
        fetchDriveFiles(driveSearchTerm); // Fetch files with the current search term
    };

    // Handler for pressing Enter in the search field
    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleDriveSearch();
        }
    };

    const handleDriveFileSelect = async (file) => {
        handleCloseDriveModal();
        setUploading(true); // Use the main uploading state
        setSuccessMessage(null);
        setError(null);
        setDriveError(null);

        try {
            const token = sessionStorage.getItem('jwtToken');
            if (!token) { window.location.href = '/login'; return; }
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const response = await axiosInstance.get(`/google-drive/download/${file.id}`, {
                responseType: 'blob',
            });

            const mimeType = response.headers['content-type'] || 'application/pdf';
            const filename = file.name.toLowerCase().endsWith('.pdf') ? file.name : `${file.name}.pdf`;
            const downloadedFile = new File([response.data], filename, { type: mimeType });

            await handleFileUpload(downloadedFile); // Reuse the main upload handler

        } catch (err) {
            const errorMsg = err.response?.data?.error || 'Failed to download or process file from Google Drive.';
            console.error('Error selecting/downloading Google Drive file:', err);
            setError(errorMsg); // Set the main error state
             if (err.response?.status === 401) {
                setIsGoogleConnected(false);
                setError("Google Drive connection issue. Please reconnect.");
            }
            setUploading(false);
        }
    };

    const isSectionDisabled = parentDisabled || uploading;

    return (
        <Box>
            <Typography variant="h6" sx={{ marginTop: 2 }}>Resume</Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Paste your resume text below, or upload a PDF/DOCX file to automatically parse and save the text.
            </Typography>

            {/* Display local errors/success messages */}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

            {/* --- Resume Upload Options --- */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ marginBottom: 2, alignItems: 'flex-start' }}>
                 {/* Device Upload */}
                 <FormControl sx={{ flex: 1 }}>
                    <FormLabel sx={{ marginBottom: 1 }}>Upload from Device (PDF/DOCX)</FormLabel>
                    <Input
                        type="file"
                        inputRef={fileInputRef}
                        onChange={handleFileChange}
                        inputProps={{ accept: '.pdf,.docx' }}
                        disabled={isSectionDisabled}
                        sx={{ mb: 1 }}
                    />
                    {selectedFile && (
                        <Typography variant="body2" sx={{ mb: 1, wordBreak: 'break-all' }}>
                            Selected: {selectedFile.name}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleFileUpload()}
                        disabled={!selectedFile || isSectionDisabled}
                        sx={{ alignSelf: 'flex-start', mt: 1 }}
                    >
                        {uploading && selectedFile ? <CircularProgress size={24} /> : 'Read & Save Resume'}
                    </Button>
                </FormControl>

                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
                <Divider orientation="horizontal" sx={{ width: '100%', display: { xs: 'block', sm: 'none' }, my: 2 }} />

                 {/* Google Drive Upload */}
                 <FormControl sx={{ flex: 1 }}>
                     <FormLabel sx={{ marginBottom: 1 }}>Upload from Google Drive</FormLabel>
                     {!isGoogleConnected ? (
                         <Button
                             variant="contained"
                             startIcon={<GoogleIcon />}
                             onClick={handleConnectGoogleDrive}
                             disabled={isSectionDisabled}
                             sx={{ alignSelf: 'flex-start' }}
                         >
                             Connect Google Drive
                         </Button>
                     ) : (
                         <Button
                             variant="contained"
                             startIcon={<GoogleIcon />}
                             onClick={handleOpenDriveModal}
                             disabled={isSectionDisabled || driveLoading}
                             sx={{ alignSelf: 'flex-start' }}
                         >
                             Choose from Google Drive
                         </Button>
                     )}
                      {/* Display Drive-specific errors here if modal isn't open */}
                      {driveError && !showDriveModal && (
                         <Alert severity="error" sx={{ mt: 1 }}>{driveError}</Alert>
                      )}
                 </FormControl>
            </Stack>
            {/* --- End Resume Upload Options --- */}

            {/* Resume Text Area */}
            <TextField
                label="Current Resume Text"
                value={currentResumeText}
                onChange={handleLocalResumeChange}
                disabled={isSectionDisabled}
                multiline
                rows={10}
                fullWidth
            />

            {/* Google Drive File Picker Modal */}
            <Dialog open={showDriveModal} onClose={handleCloseDriveModal} fullWidth maxWidth="sm">
                <DialogTitle>
                    Choose Resume from Google Drive
                    <IconButton aria-label="close" onClick={handleCloseDriveModal} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {/* Search Bar */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <TextField
                            label="Search by name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={driveSearchTerm}
                            onChange={(e) => setDriveSearchTerm(e.target.value)}
                            onKeyDown={handleSearchKeyDown} // Trigger search on Enter
                            disabled={driveLoading}
                        />
                        <Button
                            variant="contained"
                            onClick={handleDriveSearch}
                            disabled={driveLoading}
                        >
                            Search
                        </Button>
                    </Box>

                    {/* File List Area */}
                    {driveLoading && <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}><CircularProgress /></Box>}
                    {driveError && <Alert severity="error" sx={{ mb: 2 }}>{driveError}</Alert>}
                    {!driveLoading && !driveError && driveFiles.length === 0 && (
                        <Typography>
                            {driveSearchTerm ? `No files found matching "${driveSearchTerm}".` : 'No compatible files (PDF, Google Docs) found.'}
                        </Typography>
                    )}
                    {!driveLoading && !driveError && driveFiles.length > 0 && (
                        <List>
                            {driveFiles.map((file) => (
                                <ListItem key={file.id} disablePadding>
                                    <ListItemButton onClick={() => handleDriveFileSelect(file)} disabled={uploading}>
                                        <ListItemIcon><DescriptionIcon /></ListItemIcon>
                                        <ListItemText primary={file.name} secondary={`Modified: ${new Date(file.modifiedTime).toLocaleDateString()}`} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDriveModal} disabled={uploading}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ResumeSection;
