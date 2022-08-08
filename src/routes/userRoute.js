import { Router } from "express";
import { userController } from "../controllers/index.js";

import { urlMiddleware } from "../middlewares/index.js";

const userRouter = Router();

userRouter.get(
  "/users/me",
  urlMiddleware.validateHeader,
  urlMiddleware.checkTokenBelongsSomeUser,
  userController.getUserLinks
);

export { userRouter };
