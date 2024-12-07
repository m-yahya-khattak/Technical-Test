import { Router } from "express";
import { updateUserData, fetchUserData, createUserData } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Create a new user document
router.post("/user", authMiddleware, createUserData);

// Update an existing user document
router.put("/user/:id", authMiddleware, updateUserData);

// Fetch a specific user document
router.get("/user/:id", authMiddleware, fetchUserData);

export default router;
