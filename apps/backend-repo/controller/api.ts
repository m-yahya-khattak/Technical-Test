import { Request, Response } from "express";
import { updateUser, fetchUser, createUser } from "../repository/userCollection";
// import { User } from "../entities/user";
import { User } from "shared/types/user";
import { validateUser } from "shared/utils/userValidation";

export const createUserData = async (req: Request, res: Response) => {
  const userData: User = req.body; // Expecting user data in the request body

  const validationErrors = validateUser(userData);
  if (validationErrors.length > 0) {
    res.status(400).json({ errors: validationErrors });
    return; // Ensure the function resolves here
  }

  try {
    await createUser(userData);
    res.status(201).json({ message: "User document created successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

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
