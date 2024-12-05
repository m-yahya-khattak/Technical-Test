"use client";

import React from "react";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";

export default function HomePage() {
  return (
    <Box sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Welcome to Your App
      </Typography>
      <Button
        component={Link}
        href="/login"
        variant="contained"
        sx={{ mr: 2 }}
      >
        Login
      </Button>
      <Button
        component={Link}
        href="/signup"
        variant="outlined"
      >
        Sign Up
      </Button>
    </Box>
  );
}
