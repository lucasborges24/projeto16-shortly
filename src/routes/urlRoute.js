import { Router } from "express";

import { urlMiddleware } from "../middlewares/index.js";
import { urlController } from "../controllers/index.js";

const urlRoutes = Router();

export { urlRoutes };
