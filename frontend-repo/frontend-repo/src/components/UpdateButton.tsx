"use client";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserStart, fetchUserSuccess, fetchUserError } from "../store/actions";
import { RootState } from "../store/store";
import { Button, Typography } from "@mui/material";
import { fetchUserData } from "@/apis/userApi";

export default function UpdateButton() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: RootState) => state.user);

  const handleFetchUser = async () => {
    dispatch(fetchUserStart());
    try {
      const data = await fetchUserData();
      dispatch(fetchUserSuccess(data));
    } catch (err) {
      dispatch(fetchUserError("Failed to fetch user data."));
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleFetchUser} disabled={loading}>
        Fetch User Data
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {user && <Typography>User: {JSON.stringify(user)}</Typography>}
    </div>
  );
}
