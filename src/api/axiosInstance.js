// src/api/axiosInstance.js
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    
  baseURL: `${apiUrl}/api`, // Adjust according to your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Clear local storage or cookies
      localStorage.removeItem('jwtToken');
      // Redirect to login page
      window.location.href = '/login';
      console.log('Error 401.')
      console.log(error.response)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
