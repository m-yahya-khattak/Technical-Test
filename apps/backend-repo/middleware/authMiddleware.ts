import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("Request Header", token)

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return
  }

  try {
    await admin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};