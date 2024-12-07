'use client';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { CircularProgress, Box } from "@mui/material";
import { fetchUserSuccess } from "@/store/actions"; // Import your Redux action
import { isSessionExpired } from "@/context/AuthProvider";

const getUserFromSessionStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log("Get user from session")
    const storedUser = getUserFromSessionStorage();

    if (!loading) {
      if ((!user && storedUser) || isSessionExpired()) {
        // Sync Redux with localStorage user if needed
        console.log("No user or storedUser", user)
        if (storedUser && !isSessionExpired()) {
          dispatch(fetchUserSuccess(storedUser));
        } else {
          // Redirect to login if no user or session expired
          router.replace("/login");
          localStorage.removeItem("user");
          localStorage.removeItem("sessionExpiry");
        }
      }
    }
  }, [user, loading, dispatch, router]);

  console.log("Protected Route", user);

  if (loading || (!user && !getUserFromSessionStorage())) {
    // Show a loader if state is still resolving
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
