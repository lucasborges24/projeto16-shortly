import joi from "joi";
import { connection } from "./index.js";
import { queries } from "./index.js";

// DATABASE

export const insertInUrls = async (urlObject) => {
  const { shortUrl, url } = urlObject;
  const inserted = await connection.query(queries.insertUrl(), [url, shortUrl]);
  if (inserted) return true;
  return false;
};

export const getUrlIdByShortUrl = async (shortUrl) => {
  const { rows: id } = await connection.query(queries.getUrlIdbyshortUrl(), [
    shortUrl,
  ]);
  if (id && id.length !== 0) {
    return id[0].id;
  }
  return false;
};

export const getUrlsUsersIdByUrlAndUserId = async (userId, url) => {
  const { rows: id } = await connection.query(queries.getUrlsUsersIdByUserIdAndUrl(), [url, userId]);
  if (id && id.length !== 0) {
    return id[0].id;
  }
  return false;
};

export const insertInUrlsUsers = async (urlId, userId) => {
  const inserted = await connection.query(queries.insertUrlsUsers(), [
    urlId,
    userId,
  ]);
  if (inserted) return true;
  return false;
};

// SCHEMA

export const urlSchema = joi.object({
  url: joi
    .string()
    .pattern(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    )
    .required(),
});

export const tokenSchema = joi
  .object({
    authorization: joi
      .string()
      .pattern(/^Bearer .+$/)
      .required(),
  })
  .unknown(true);
