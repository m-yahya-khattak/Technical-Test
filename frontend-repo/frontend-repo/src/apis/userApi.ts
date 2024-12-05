import axios from "axios";

const API_URL = "http://localhost:5000";

export const fetchUserData = async (userId: string) => {
  const response = await axios.get(`${API_URL}/user/${userId}`, {
    headers: { Authorization: `Bearer YOUR_TOKEN` },
  });
  return response.data;
};

export const updateUserData = async (userId: string, data: any) => {
  const response = await axios.put(`${API_URL}/user/${userId}`, data, {
    headers: { Authorization: `Bearer YOUR_TOKEN` },
  });
  return response.data;
};
