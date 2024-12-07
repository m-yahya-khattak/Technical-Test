"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useAuth } from "@/context/AuthProvider";

const LoginForm = () => {
  const { login } = useAuth(); // Access login method from AuthProvider
  const [email, setEmail] = useState<string>("m.yahya_khattak@yahoo.com");
  const [password, setPassword] = useState<string>("password");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      await login(email, password); // Use login from context
      router.push("/main"); // Redirect on success
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Failed to login.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        px: 2,
        py: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Login
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
