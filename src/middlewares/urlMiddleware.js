import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { urlModel } from "../models/index.js";

dotenv.config();

export const validateUrlBody = (req, res, next) => {
  const validate = urlModel.urlSchema.validate(req.body);
  if (validate.error) {
    return res
      .status(422)
      .send(`Some error with JSON body: ${validate.error.message}`);
  }

  const url = {
    url: validate.value.url,
  };

  res.locals.url = url;
  next();
  return true;
};

export const validateHeader = (req, res, next) => {
    const headerValidation = urlModel.tokenSchema.validate(req.headers)
    if (headerValidation.error) {
        return res.status(401).send(`Invalid token: ${headerValidation.error.message}`)
    }

    const token = {
        token: headerValidation.value.authorization.split(" ")[1]
    }

export const checkTokenBelongsSomeUser = (req, res, next) => {
  const { token } = res.locals.token;
  const { JWT_SECRET } = process.env;

  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    res.locals.id = userId;
    next();
    return true;
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
};
