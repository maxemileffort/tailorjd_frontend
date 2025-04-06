// context/UserContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import axiosInstance from '../api/axiosInstance';
import { parseJwt } from '../utils/jwtParser';


const UserContext = createContext();

const UserProvider = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

    // Define logout function
    const logout = useCallback((reason = null) => {
        console.log('Logging out, reason:', reason);
        sessionStorage.removeItem('jwtToken');
        delete axiosInstance.defaults.headers.common['Authorization']; // Clear auth header
        setIsAuthenticated(false);
        setRole(null);
        if (reason) {
            sessionStorage.setItem('logoutReason', reason); // Store reason for login page
        }
        navigate('/login'); // Redirect to login
    }, [navigate]);
    
    useEffect(() => {
        const checkAuth = async () => {
            const token = sessionStorage.getItem('jwtToken');
            
            // const isTokenExpired = (token) => {
            //     const decoded = parseJwt(token);
            //     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            //     return decoded.exp < currentTime; // Compare expiry time
            // };
            const wasAuthenticated = isAuthenticated; // Check previous state

            const isTokenExpired = (token) => {
                try {
                    const decoded = parseJwt(token);
                    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
                    return decoded.exp < currentTime; // Compare expiry time
                } catch (e) {
                    console.error("Error decoding token:", e);
                    return true; // Treat decoding error as expired/invalid
                }
            };
            
            if (!token || isTokenExpired(token)) {
                if (wasAuthenticated) { // Only logout if previously authenticated
                   logout('session_expired');
                } else {
                    // Ensure state is clean if not authenticated and no token
                    setIsAuthenticated(false);
                    setRole(null);
                    sessionStorage.removeItem('jwtToken'); // Ensure token is removed
                    delete axiosInstance.defaults.headers.common['Authorization'];
                }
                return;
            }              
            
            try {
                // Set the Authorization header for the check
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                // Call the token-check endpoint
                const response = await axiosInstance.post('/auth/token-check');
                const newToken = response.data.token;
                
                // Update the token if it was refreshed (or just set it)
                const decodedToken = parseJwt(newToken);
                sessionStorage.setItem('jwtToken', newToken);
                // Ensure header is updated with the potentially new token
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`; 
                
                setRole(decodedToken.role); 
                setIsAuthenticated(true);
                
            } catch (error) {
                console.error('Authentication check failed:', error); // Log the error
                // If the check fails (e.g., server explicitly rejects token), log out
                if (wasAuthenticated) {
                    logout('session_invalid'); 
                } else {
                     // Ensure state is clean if not authenticated and check failed
                    setIsAuthenticated(false);
                    setRole(null);
                    sessionStorage.removeItem('jwtToken');
                    delete axiosInstance.defaults.headers.common['Authorization'];
                }
            }
        };
        
        checkAuth();
    // Add logout to dependency array if it changes, though useCallback should stabilize it
    }, [isAuthenticated, role, location.pathname, logout]); 
    
    return (
        // Expose logout function via context
        <UserContext.Provider value={{ isAuthenticated, role, logout }}> 
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
