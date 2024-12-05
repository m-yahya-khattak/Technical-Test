import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5001", // Firebase emulator or backend API base URL
});

export const fetchUserData = async () => {
  const response = await apiClient.get("/api/user");
  return response.data;
};

export const updateUserData = async (data: any) => {
  const response = await apiClient.put("/api/user", data);
  return response.data;
};
