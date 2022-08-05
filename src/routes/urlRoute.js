import { Router } from "express";

import { urlMiddleware } from "../middlewares/index.js";
import { urlController } from "../controllers/index.js";

const urlRoutes = Router();

urlRoutes.post(
  "/urls/shorten",
  urlMiddleware.validateUrlBody,
  urlMiddleware.validateHeader,
  urlMiddleware.checkTokenBelongsSomeUser,
  urlController.postShortUrl
);

urlRoutes.get(
  "/urls/:id",
  urlMiddleware.validateParamsId,
  urlMiddleware.checkParamsIdbelongsSomeUrl,
  urlController.getUrlById
);

urlRoutes.get(
  "/urls/open/:shortUrl",
  urlMiddleware.validateParamsShortUrl,
  urlMiddleware.checkParamsShortUrlExists,
  urlController.openShortUrl
);

urlRoutes.delete(
  "/urls/:id",
  urlMiddleware.validateParamsId,
  urlMiddleware.validateHeader,
  urlMiddleware.checkTokenBelongsSomeUser,
  urlMiddleware.checkParamsIdbelongsSomeUrl,
  urlMiddleware.checkUserTokenBelongsToUrlOwner,
  urlController.deleteUrl
);

export { urlRoutes };
