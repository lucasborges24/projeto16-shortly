import { Router } from "express";

import { rankingController } from "../controllers/index.js";

const rankingRoutes = Router();

rankingRoutes.get("/ranking", rankingController.getRanking);

export { rankingRoutes };
