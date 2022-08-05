import { Router } from "express";

import { rankingMiddleware } from "../middlewares/index.js";
import { rankingController } from "../controllers/index.js";

const rankingRoutes = Router();

rankingRoutes.get("/ranking", (req, res) => res.send('opa') )

export { rankingRoutes };
