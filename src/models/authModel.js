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
    const {rows: passwordCrypt} = await connection.query(queries.getPasswordByEmail(), [email])
    return passwordCrypt[0]?.password;
}

// SCHEMA

export const signupSchema = joi.object({
  name: joi.string().required().trim(),
  email: joi.string().email().required().trim(),
  password: joi.string().required(),
  confirmPassword: joi.string().equal(joi.ref("password")).required(),
});
