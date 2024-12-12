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
    if (
      error.response.status === 401
    ) {
      // Clear local storage or cookies
      sessionStorage.removeItem('jwtToken');
      // Check if the URL contains 'dashboard'
      if (error.config.url.includes('dashboard') ){
        // Redirect to login page
      window.location.href = '/login';
      console.log('Redirecting due to 401 on a dashboard route.');
      }
      
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
