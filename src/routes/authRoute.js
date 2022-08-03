import { Router } from "express";

import { authMiddleware } from "../middlewares/index.js";
import { authController } from "../controllers/index.js";

const authRoutes = Router();

authRoutes.post(
  "/signup",
  authMiddleware.validateSignUpBody,
  authMiddleware.checkEmailAlreadyExist,
  authController.signUp
);

authRoutes.post(
  "/signin",
  authMiddleware.validateSignInBody,
  authMiddleware.checkPasswordByEmail
);

export { authRoutes };
