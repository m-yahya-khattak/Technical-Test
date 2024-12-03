import { Request, Response } from "express";
import { updateUser, fetchUser } from "../repository/userCollection";
import { User } from "../entities/user";

export const updateUserData = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const userData: Partial<User> = req.body;

  try {
    await updateUser(userId, userData);
    res.status(200).json({ message: "User data updated successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchUserData = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await fetchUser(userId);
    if (!user) {
        res.status(404).json({ message: "User not found" })
        return;
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
