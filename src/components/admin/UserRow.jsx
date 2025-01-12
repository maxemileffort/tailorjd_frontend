import React from 'react';
import { TableRow, TableCell, TextField, Select, MenuItem, Button, FormControl, Checkbox } from '@mui/material';

const UserRow = ({ user, selected, onToggleSelect, onCreditChange, onRoleChange, onUpdateCredits, onDeleteUser }) => (
  <TableRow key={user.id}>
    <TableCell>
      <Checkbox checked={selected} onChange={() => onToggleSelect(user.id)} />
    </TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>
      <TextField
        type="number"
        size="small"
        value={user.creditBalance}
        onChange={(e) => onCreditChange(user.id, parseInt(e.target.value, 10))}
      />
    </TableCell>
    <TableCell>
      <FormControl fullWidth size="small">
        <Select value={user.role} onChange={(e) => onRoleChange(user.id, e.target.value)}>
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
        color={user.email.includes('@tailorjd.com') ? 'default' : "primary"}
        size="small" 
        onClick={() => onUpdateCredits(user.id, user.creditBalance)}
        disabled={user.email.includes('@tailorjd.com')}
      >
        Update
      </Button>
      <Button
        variant="contained"
        color={user.email.includes('@tailorjd.com') ? 'default' : "error"}
        size="small"
        onClick={(event) => onDeleteUser(user.id, event)}
        disabled={user.email.includes('@tailorjd.com')}
      >
        Delete
      </Button>
    </TableCell>
  </TableRow>
);

export default UserRow;
