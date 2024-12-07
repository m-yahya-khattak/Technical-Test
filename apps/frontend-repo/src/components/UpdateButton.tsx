'use client';

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, TextField, Box } from "@mui/material";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserError,
} from "@/store/actions";
import { updateUserData } from "@/apis/userApi";
import { RootState } from "@/store/store";

const UpdateButton = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: RootState) => state.user);

  // State for new user fields
  const [newAge, setNewAge] = useState("");
  const [newOccupation, setNewOccupation] = useState("");
  const [newPassion, setNewPassion] = useState("");

  const handleUpdateUser = async () => {
    if (!user?.uid) {
      dispatch(updateUserError("No user data available to update."));
      return;
    }

    dispatch(updateUserStart());
    try {
      // Combine all fields into an object to update
      const updatedData = await updateUserData(user.uid, {
        age: newAge,
        occupation: newOccupation,
        passion: newPassion,
      });

      dispatch(updateUserSuccess(updatedData)); // Update Redux store
      console.log("User updated successfully:", updatedData);
    } catch (err) {
      console.error("Update failed:", err);
      dispatch(updateUserError("Failed to update user data."));
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Update User Details
      </Typography>
      {user && (
        <>
          <TextField
            label="New Age"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newAge}
            onChange={(e) => setNewAge(e.target.value)}
          />
          <TextField
            label="New Occupation"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newOccupation}
            onChange={(e) => setNewOccupation(e.target.value)}
          />
          <TextField
            label="New Passion"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newPassion}
            onChange={(e) => setNewPassion(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleUpdateUser}
            disabled={loading || !(newAge || newOccupation || newPassion)}
            sx={{ mt: 2 }}
          >
            Update User Details
          </Button>
        </>
      )}
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {user && (
        <Typography sx={{ mt: 2 }}>
          Updated User: {JSON.stringify(user, null, 2)}
        </Typography>
      )}
    </Box>
  );
};

export default UpdateButton;