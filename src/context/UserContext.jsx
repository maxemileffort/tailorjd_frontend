// context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { parseJwt } from '../utils/jwtParser';


const UserContext = createContext();

const UserProvider = ({ children }) => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    
    useEffect(() => {
        const checkAuth = async () => {
            const token = sessionStorage.getItem('jwtToken');
            
            const isTokenExpired = (token) => {
                const decoded = parseJwt(token);
                const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
                return decoded.exp < currentTime; // Compare expiry time
            };
            
            if (!token || (token && isTokenExpired(token))) {
                sessionStorage.removeItem('jwtToken');
                setIsAuthenticated(false);
                setRole(null);
                return;
            }              
            
            try {
                // Set the Authorization header
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                // Call the token-check endpoint
                const response = await axiosInstance.post('/auth/token-check');
                const newToken = response.data.token;
                
                // Update the token if it was refreshed
                // if (newToken && newToken !== token) {
                const decodedToken = parseJwt(newToken);
                // console.log(`decodedToken: ${decodedToken}`);
                sessionStorage.setItem('jwtToken', newToken);
                // }
                
                setRole(decodedToken.role); 
                setIsAuthenticated(true);
                // }
                
                
            } catch (error) {
                console.error('Authentication check failed:', error); // Log the error
                sessionStorage.removeItem('jwtToken');
                setIsAuthenticated(false);
                setRole(null);
            }
            
        };
        
        checkAuth();
    }, [isAuthenticated, role, location.pathname]);
    
    return (
        <UserContext.Provider value={{ isAuthenticated, role }}>
        {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
