import { stripHtml } from "string-strip-html";

import { authModel } from "../models/index.js";

export const validateBody = (req, res, next) => {
  const validateBody = authModel.signupSchema.validate(req.body);
  if (validateBody.error) {
    return res.status(422).send("Some error with JSON body");
  }

  const newUser = {
    name: stripHtml(validateBody.value.name).result,
    email: stripHtml(validateBody.value.email).result,
    password: validateBody.value.password,
    confirmPassword: validateBody.value.confirmPassword,
  };

  const validateStrippedBody = authModel.signupSchema.validate(newUser);
  if (validateStrippedBody.error) {
    return res
      .status(422)
      .send("Some error with JSON body envolving HTML tags");
  }

  res.locals.newUser = newUser;
  next();
  return true;
};

export const checkEmailAlreadyExist = async (req, res, next) => {
  const { email } = res.locals.newUser;
  const emailExists = await authModel.emailAlreadyExists(email);
  if (emailExists) {
    return res.sendStatus(409)
  }
  next();
  return true;
};
