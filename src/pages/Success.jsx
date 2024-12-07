import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sessionDetails, setSessionDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extract session_id from the URL
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');

  // Fetch Stripe session details (optional)
  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiUrl}/api/checkouts/get-session-details?session_id=${sessionId}`);
        const data = await response.json();
        setSessionDetails(data);
      } catch (error) {
        console.error('Error fetching session details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Processing your purchase...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Thank You for Your Purchase!
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Your purchase was successful. We’ve added your credits or subscription to your account.
      </Typography>

      {sessionDetails && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Purchase Details</Typography>
          <Typography variant="body2">
            <strong>Plan:</strong> {sessionDetails.plan_name || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Amount Paid:</strong> ${sessionDetails.amount_total / 100 || 'N/A'}
          </Typography>
        </Box>
      )}

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Next Steps</Typography>
          <Typography variant="body2">
            Shortly you should receive an email with a link to reset your password.
          </Typography>
          <Typography variant="body2">
            Please, also check your spam folders. If you still can't find it, <a href="#" onClick={navigate('/contact')}>send us a message</a> and we'll get it sorted out.
          </Typography>
        </Box>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Success;
