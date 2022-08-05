import { Router } from "express";

import { authRoutes } from "./authRoute.js";
import { urlRoutes } from "./urlRoute.js";

const router = Router();
router.use(authRoutes)
router.use(urlRoutes)

export default router;