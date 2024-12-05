import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { fetchUserData } from "@/apis/userApi";

const UpdateButton = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFetch = async () => {
    setLoading(true);
    setMessage("");
    try {
      const userData = await fetchUserData("USER_ID");
      setMessage(`User: ${JSON.stringify(userData)}`);
    } catch (error) {
      setMessage("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleFetch} disabled={loading}>
        {loading ? "Loading..." : "Fetch User Data"}
      </Button>
      {message && <Typography>{message}</Typography>}
    </div>
  );
};

export default UpdateButton;
