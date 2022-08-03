import bcrypt from "bcrypt";
import { authModel } from "../models/index.js";

export const signUp = async (req, res) => {
  const { name, email, password } = res.locals.newUser;
  const passwordCrypt = bcrypt.hashSync(password, 10);
  const user = {
    name,
    email,
    password: passwordCrypt,
  };

  try {
    await authModel.insertNewUser(user);
    res.sendStatus(201)
  } catch (error) {
    res.sendStatus(500)
  }
};
