import { nanoid } from "nanoid";

import { urlModel } from "../models/index.js";

export const NANOID_PARAM = 10;

export const postShortUrl = async (req, res) => {
  const userId = res.locals.id;
  const { url } = res.locals.url;
  const shortUrl = nanoid(NANOID_PARAM);
  const urlObject = {
    url,
    shortUrl,
  };

  try {
    const urlIdAlreadyExists = await checkUrlAlreadyPosted(userId, url);
    if (urlIdAlreadyExists) {
      return res.status(409).send("Url Already Registered.");
    }

    await urlModel.insertInUrls(urlObject);
    const urlId = await urlModel.getUrlIdByShortUrl(shortUrl);
    await urlModel.insertInUrlsUsers(urlId, userId);
    res.status(201).send({ shortUrl });
  } catch (error) {
    res
      .status(500)
      .send(`Internal system error.\n More details: ${error.message}`);
  }
};

export const getUrlById = (req, res) => {
  const { response } = res.locals;
  res.status(200).send(response);
};

const checkUrlAlreadyPosted = async (userId, url) => {
  const urlIdExists = await urlModel.getUrlsUsersIdByUrlAndUserId(userId, url);
  return urlIdExists;
};
