import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';
import UserRow from './UserRow';
import BatchUpdateControls from './BatchUpdateControls';
import { fetchUsersApi, updateCreditsApi, updateRoleApi, deleteUser } from '../../api/users';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState({});
  const [batchCredits, setBatchCredits] = useState(0);
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setServerSuccess('');
      setServerError('');
      try {
        const data = await fetchUsersApi();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setServerError('Failed to fetch users. Please try again.');
        navigate('/login');
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleCreditChange = (userId, newCreditBalance) => {
    setServerSuccess('');
    setServerError('');
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, creditBalance: newCreditBalance } : user))
    );
  };

  const handleRoleChange = async (userId, newRole) => {
    setServerSuccess('');
    setServerError('');
    try {
      await updateRoleApi(userId, newRole);
      setServerSuccess('Role updated successfully!');
    } catch (error) {
      console.error('Error updating role:', error);
      setServerError('Failed to update role. Please try again.');
    }
  };

  const handleBatchUpdate = async () => {
    setServerSuccess('');
    setServerError('');
    const selectedUserIds = Object.keys(selectedUsers).filter((id) => selectedUsers[id]);
    try {
      for (const userId of selectedUserIds) {
        await updateCreditsApi(userId, batchCredits);
      }
      setServerSuccess('Credits updated successfully for selected users!');
    } catch (error) {
      console.error('Error during batch update:', error);
      setServerError('Failed to update credits. Please try again.');
    }
  };

  const handleDeletion = async (userId, event) => {
    event.preventDefault();
    setServerSuccess('');
    setServerError('');
    try {
      const didDelete = await deleteUser(userId, event);
      if (didDelete) {
        setServerSuccess('User deleted successfully!');
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId)); // Update the UI
      }
      
    } catch (error) {
      console.error('Error deleting user:', error);
      setServerError('Failed to delete user. Please try again later.');
    }
  };

  const toggleSelectUser = (userId) => {
    setSelectedUsers((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Users
      </Typography>
      {serverError && <Alert severity="error">{serverError}</Alert>}
      {serverSuccess && <Alert severity="info">{serverSuccess}</Alert>}
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
              <UserRow
                key={user.id}
                user={user}
                selected={!!selectedUsers[user.id]}
                onToggleSelect={toggleSelectUser}
                onCreditChange={handleCreditChange}
                onRoleChange={handleRoleChange}
                onUpdateCredits={updateCreditsApi}
                onDeleteUser={handleDeletion}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BatchUpdateControls
        batchCredits={batchCredits}
        onBatchCreditChange={setBatchCredits}
        onBatchUpdate={handleBatchUpdate}
      />
    </Box>
  );
};

export default AdminUsers;
