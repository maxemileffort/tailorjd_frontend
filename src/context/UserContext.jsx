// context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState('USER');

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('jwtToken');

            if (!token) {
                setIsAuthenticated(false);
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
                    localStorage.setItem('jwtToken', newToken);
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                }

                const decodedToken = jwtDecode(newToken);
                setIsAuthenticated(true);
                setRole(decodedToken.role); // Assign role from token

            } catch (error) {
                // Token is invalid or expired
                localStorage.removeItem('jwtToken');
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <UserContext.Provider value={{ isAuthenticated, role }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
