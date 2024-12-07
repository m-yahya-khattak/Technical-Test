import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const createUserData = async (uid: string, email: string, displayName: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/user`,  // Backend API route
      { uid, email, displayName },  // Pass data in the body of the request
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },  // Include auth token
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;  // Optional: rethrow to handle errors in the calling component
  }
};


export const fetchUserData = async (userId: string) => {
  const response = await axios.get(`${API_BASE_URL}/api/user/${userId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Include auth token
  });
  return response.data;
};

export const updateUserData = async (userId: string, updates: Record<string, any>) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/user/${userId}`,
    updates,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Include auth token
    }
  );
  return response.data;
};
