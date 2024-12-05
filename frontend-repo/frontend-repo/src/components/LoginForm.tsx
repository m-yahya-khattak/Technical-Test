import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../apis/firebase";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", userCredential.user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
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
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
