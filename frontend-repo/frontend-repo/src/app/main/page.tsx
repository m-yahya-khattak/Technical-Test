'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Box } from '@mui/material';
import { RootState } from '@/store/store';
import { updateUserError, updateUserStart, updateUserSuccess } from '@/store/actions';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: RootState) => state.user);

  const handleUpdate = async () => {
    dispatch(updateUserStart());
    try {
      // Simulate an API call
      const updatedData = { name: 'Updated Name', role: 'Admin' }; // Mocked update
      dispatch(updateUserSuccess(updatedData));
    } catch (err: any) {
      dispatch(updateUserError(err.message || 'Update failed'));
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding={2}
    >
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.email || 'User'}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Role: {user?.role || 'N/A'}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        disabled={loading}
      >
        Update User Data
      </Button>
      {loading && <Typography variant="body2">Updating...</Typography>}
      {error && (
        <Typography color="error" variant="body2" marginTop={1}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default MainPage;
