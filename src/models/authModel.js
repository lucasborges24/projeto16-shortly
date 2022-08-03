import joi from "joi";
import { connection } from "./index.js";
import { queries } from "./index.js";

// DATABASE

export const emailAlreadyExists = async (email) => {
  const { rows: user } = await connection.query(queries.getEmailByEmail(), [
    email,
  ]);
  if (user && user.length !== 0) {
    return true;
  }
  return false;
};

export const insertNewUser = async (user) => {
  const { name, email, password } = user;
  await connection.query(queries.insertInUsers(), [name, email, password]);
};

export const getPasswordByEmail = async (email) => {
  const { rows: passwordCrypt } = await connection.query(
    queries.getPasswordByEmail(),
    [email]
  );
  return passwordCrypt[0]?.password;
};

export const getUserByEmail = async (email) => {
  const { rows: user } = await connection.query(queries.getUserByEmail(), [
    email,
  ]);
  return user[0];
};

export const insertSession = async (userId) => {
  const inserted = await connection.query(queries.insertSessionWithoutToken(), [
    userId,
  ]);
  if (inserted) {
    return true;
  }
  return false;
};

export const updateSession = async (userId, token) => {
  const updated = await connection.query(queries.updateSession(), [
    token,
    userId,
  ]);
  if (updated) {
    return true;
  }
  return false;
};

export const selectSessionByUserId = async (userId) => {
  const { rows: session } = await connection.query(
    queries.getSessionByUserId(),
    [userId]
  );
  return session[0];
};

// SCHEMA

export const signupSchema = joi.object({
  name: joi.string().required().trim(),
  email: joi.string().email().required().trim(),
  password: joi.string().required(),
  confirmPassword: joi.string().equal(joi.ref("password")).required(),
});

export const signinSchema = joi.object({
  email: joi.string().email().required().trim(),
  password: joi.string().required(),
});
