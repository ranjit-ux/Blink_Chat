// routes/users.routes.js
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsers } from "../controllers/users.controller.js";

const router = express.Router();

// ✅ GET /api/users
router.get("/", protectRoute, getUsers);

export default router;
