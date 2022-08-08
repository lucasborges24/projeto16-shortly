import { Router } from "express";

import { authRoutes } from "./authRoute.js";
import { rankingRoutes } from "./rankingRoute.js";
import { urlRoutes } from "./urlRoute.js";
import { userRouter } from "./userRoute.js";

const router = Router();
router.use(authRoutes);
router.use(urlRoutes);
router.use(rankingRoutes);
router.use(userRouter);

export default router;
