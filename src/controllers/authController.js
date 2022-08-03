import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { authModel } from "../models/index.js";

dotenv.config();
const EXPIRE_TIME = 24 * 60 * 60; // 1 day
const jwtExpire = {
    expiresIn: EXPIRE_TIME
}

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
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const signIn = async (req, res) => {
  const { email } = res.locals.user;
  const data = { email };
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(data, secretKey, jwtExpire)

  res.send(token)
};
