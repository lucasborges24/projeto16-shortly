import joi from "joi";
import { connection } from "./index.js";
import { queries } from "./index.js";

// DATABASE

// SCHEMA

export const urlSchema = joi.object({
  url: joi
    .string()
    .pattern(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    )
    .required(),
});
