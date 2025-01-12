import axiosInstance from './axiosInstance';

// Fetch all users
export const fetchUsersApi = async () => {
  const response = await axiosInstance.get('/users/');
  return response.data;
};

// Update credits for a user
export const updateCreditsApi = async (userId, amount) => {
  await axiosInstance.post('/credits/admin/add-credits', { userId, amount });
};

// Update role for a user
export const updateRoleApi = async (userId, newRole) => {
  await axiosInstance.put(`/users/${userId}/role`, { role: newRole });
};

// export const deleteUser = async (userId) => {
//     try {
//       const apiUrl = import.meta.env.VITE_API_BASE_URL;
//       const token = sessionStorage.getItem('jwtToken'); // Retrieve the JWT token
  
//       if (!token) {
//         alert('No token found. Please log in.');
//         sessionStorage.removeItem('jwtToken');
//         navigate('/login');
//         return;
//       }
  
//       const response = await fetch(`${apiUrl}/api/users/${userId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//         },
//       });
  
//       if (!response.ok) {
//         alert('Failed to delete user. Please try again later.');
//         return;
//       }
  
//       alert('User deleted successfully!');
//       setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId)); // Update the UI
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       alert('An unexpected error occurred. Please try again later.');
//     }
//   };

export const deleteUser = async (userId, event) => {
    if (event) {
        event.preventDefault(); // Prevent default behavior of the event
    }

    try {
      // Show a confirmation dialog
      const confirmDeletion = window.confirm('Are you sure you want to delete this user? This action cannot be undone.');
      
      // If the user cancels, exit the function
      if (!confirmDeletion) {
        return;
      }
  
      const token = sessionStorage.getItem('jwtToken'); // Retrieve the JWT token
  
      if (!token) {
        alert('No token found. Please log in.');
        sessionStorage.removeItem('jwtToken');
        navigate('/login');
        return;
      }

      await axiosInstance.delete(`/users/${userId}`);
  
      return true;
    //   setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId)); // Update the UI
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };
  