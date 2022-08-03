import { Router } from "express";

import { authMiddleware } from "../middlewares/index.js";
import { authController } from "../controllers/index.js";

const authRoutes = Router();

authRoutes.post(
  "/signup",
  authMiddleware.validateBody,
  authMiddleware.checkEmailAlreadyExist,
  authController.signUp
);

export { authRoutes };
