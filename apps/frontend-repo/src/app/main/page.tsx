'use client';

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useAuth } from "@/context/AuthProvider";
import { RootState } from "@/store/store";
import UpdateButton from "@/components/UpdateButton";
import ProtectedRoute from "@/components/ProtectedRoute";
import { fetchUserData } from "@/apis/userApi";
import { useRouter } from "next/navigation";

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  age: string;
  occupation: string;
  passion: string;
}

const MainPage: React.FC = () => {
  const { user, loading: userLoading, error: userError } = useSelector((state: RootState) => state.user);
  const { logout } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      console.log("User logged out successfully");
  
      // Navigate to login page
      router.push("/login");
    } catch (err: any) {
      console.error("Logout failed:", err.message || err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user?.uid) {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchUserData(user.uid);
          setUserData(data);
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to fetch user data.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user?.uid]);

  return (
    <ProtectedRoute>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        padding={2}
      >
        {userLoading ? (
          <CircularProgress />
        ) : userError ? (
          <Typography color="error">{userError}</Typography>
        ) : user && (
          <>
            <Typography variant="h4" gutterBottom>
              Welcome, {user.name || "User"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {user.email || "N/A"}
            </Typography>

            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : userData ? (
              <>
                <Typography variant="h6" gutterBottom>
                  User Data Fetched from API:
                </Typography>
                <Typography variant="body1">age: {userData.age}</Typography>
                <Typography variant="body1">occupation: {userData.occupation}</Typography>
                <Typography variant="body1">passion: {userData.passion}</Typography>
              </>
            ) : (
              <Typography variant="body2">No additional user data found.</Typography>
            )}
          </>
        )}
        <UpdateButton />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          sx={{ mt: 3 }}
        >
          Logout
        </Button>
      </Box>
    </ProtectedRoute>
  );
};

export default MainPage;
