// context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
// import jwtDecode from 'jwt-decode';
import { parseJwt } from '../utils/jwtParser';


const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('jwtToken');

            if (!token) {
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
                if (newToken && newToken !== token) {
                    const decodedToken = parseJwt(newToken);
                    console.log(`decodedToken: ${decodedToken}`);
                    setRole(decodedToken.role); // Ensure decodedToken is not null
                    setIsAuthenticated(true);
                }


            } catch (error) {
                console.error('Authentication check failed:', error); // Log the error
                localStorage.removeItem('jwtToken');
                setIsAuthenticated(false);
                setRole(null);
            }
            
        };

        checkAuth();
    }, [isAuthenticated, role]);

    return (
        <UserContext.Provider value={{ isAuthenticated, role }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
