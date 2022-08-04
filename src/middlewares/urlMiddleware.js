import { urlModel } from "../models/index.js";

export const validateUrlBody = (req, res, next) => {
  const validate = urlModel.urlSchema.validate(req.body);
  if (validate.error) {
    return res.status(422).send("Some error with JSON body");
  }

  const url = {
    url: validate.value.url,
  };
  
  res.locals.url = url;
  next();
  return true;
};
