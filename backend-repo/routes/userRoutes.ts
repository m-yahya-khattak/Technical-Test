import { Router } from "express";
import { updateUserData, fetchUserData } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.put("/user/:id", authMiddleware, updateUserData);
router.get("/user/:id", authMiddleware, fetchUserData);

export default router;
