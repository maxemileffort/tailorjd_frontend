import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState({});
  const [batchCredits, setBatchCredits] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const token = sessionStorage.getItem('jwtToken'); // Retrieve the JWT token from sessionStorage
  
      if (!token) {
        console.error('No token found. Please log in.');
        alert('No token found. Please log in.');
        sessionStorage.removeItem('jwtToken');
        navigate('/login');
        return;
      }
  
      const response = await fetch(`${apiUrl}/api/users/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          alert('Session expired. Please log in again.');
        } else if (response.status === 403) {
          alert('You do not have permission to access this resource.');
        } else {
          alert('Failed to fetch users. Please try again later.');
        }
        return;
      }
  
      const data = await response.json();
      setUsers(data); // Update the users state
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };
  

  const handleCreditChange = (userId, newCreditBalance) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, creditBalance: newCreditBalance } : user
      )
    );
  };

  const updateCredits = async (userId, amount) => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const token = sessionStorage.getItem('jwtToken'); // Retrieve the JWT token
  
      if (!token) {
        alert('No token found. Please log in.');
        sessionStorage.removeItem('jwtToken');
        navigate('/login');
        return;
      }
  
      const response = await fetch(`${apiUrl}/api/credits/admin/add-credits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({ userId, amount }),
      });
  
      if (!response.ok) {
        if (response.status === 400) {
          alert('User ID and amount are required.');
        } else if (response.status === 403) {
          alert('You do not have permission to perform this action.');
        } else {
          alert('Failed to update credits. Please try again later.');
        }
        return;
      }
  
      const data = await response.json();
      // alert(`Credits updated successfully for ${data.user.email}!`);
    } catch (error) {
      console.error('Error updating credits:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const updateRole = async (userId, newRole) => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const token = sessionStorage.getItem('jwtToken'); // Retrieve the JWT token

      if (!token) {
        alert('No token found. Please log in.');
        sessionStorage.removeItem('jwtToken');
        navigate('/login');
        return;
      }

      const response = await fetch(`${apiUrl}/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        alert('Failed to update role. Please try again later.');
        return;
      }

      alert('Role updated successfully!');
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error updating role:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };
  

  const handleBatchUpdate = async () => {
    const selectedUserIds = Object.keys(selectedUsers).filter(
      (userId) => selectedUsers[userId]
    );
    try {
      for (const userId of selectedUserIds) {
        await updateCredits(userId, batchCredits);
        
      }
      alert(`Credits updated successfully for selected users!`);
      fetchUsers(); // Refresh user data
    } catch (error) {
      console.error('Error during batch update:', error);
    }
  };

  const toggleSelectUser = (userId) => {
    setSelectedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Credits</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={!!selectedUsers[user.id]}
                    onChange={() => toggleSelectUser(user.id)}
                  />
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    value={user.creditBalance}
                    onChange={(e) =>
                      handleCreditChange(user.id, parseInt(e.target.value, 10))
                    }
                  />
                </TableCell>
                <TableCell>
                  <FormControl fullWidth size="small">
                    <Select
                      value={user.role}
                      onChange={(e) => updateRole(user.id, e.target.value)}
                    >
                      <MenuItem value="USER">User</MenuItem>
                      <MenuItem value="WRITER">Writer</MenuItem>
                      <MenuItem value="ADMIN">Admin</MenuItem>
                      <MenuItem value="AFFILIATE">Affiliate</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => updateCredits(user.id, user.creditBalance)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4}>
        <Typography variant="h6">Batch Update Credits</Typography>
        <TextField
          type="number"
          size="small"
          value={batchCredits}
          onChange={(e) => setBatchCredits(parseInt(e.target.value, 10))}
          placeholder="Enter credit amount"
          sx={{ marginRight: 2 }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleBatchUpdate}
        >
          Apply to Selected Users
        </Button>
      </Box>
    </Box>
  );
};

export default AdminUsers;
