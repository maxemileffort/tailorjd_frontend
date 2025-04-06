import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api`, // Adjust according to your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20 * 1000 // set to 20 seconds
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error is a 401 Unauthorized response
    if (error.response && error.response.status === 401) {
      console.log('Axios interceptor caught 401. Clearing token.');
      // Clear the token from session storage.
      // The UserContext will detect this change and handle the logout state and redirect.
      sessionStorage.removeItem('jwtToken');
      // Also clear the default header in case it was set
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
    // Important: Always reject the promise so the calling code knows the request failed.
    return Promise.reject(error);
  }
);

export default axiosInstance;
