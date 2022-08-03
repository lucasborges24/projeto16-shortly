import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { authModel } from "../models/index.js";

dotenv.config();
const EXPIRE_TIME = 24 * 60 * 60; // 1 day
const jwtExpire = {
  expiresIn: EXPIRE_TIME,
};

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
    const {id} = await authModel.getUserByEmail(email);;
    await authModel.insertSession(id);
    res.sendStatus(201)
  } catch (error) {
    res.sendStatus(500);
  }
};

export const signIn = async (req, res) => {
  const { email } = res.locals.user;
  try {
    const user = await authModel.getUserByEmail(email);
    const { id: userId } = user;
    const session = await authModel.selectSessionByUserId(userId);
    const tokenIsValid = jwtVerification(session);
    if (tokenIsValid) {
      res.send(session.token);
    } else {
      const data = { sessionId: session.id };
      const secretKey = process.env.JWT_SECRET;
      const newToken = jwt.sign(data, secretKey, jwtExpire);
      await authModel.updateSession(session.userId, newToken);
      res.send(newToken);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

const jwtVerification = (session) => {
  const { token } = session;
  try {
    const { sessionId } = jwt.verify(token, process.env.JWT_SECRET);
    return sessionId;
  } catch (error) {
    return false;
  }
};
