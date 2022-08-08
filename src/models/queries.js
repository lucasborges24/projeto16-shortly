export const getEmailByEmail = () => {
  const query = `--sql
    SELECT
        email
    FROM
        users
    WHERE
        email = $1;             
`;

  return query;
};

export const insertInUsers = () => {
  const query = `--sql
        INSERT INTO
            users ("name", "email", "password")
        VALUES
            ($1, $2, $3);        
    `;
  return query;
};

export const getPasswordByEmail = () => {
  const query = `--sql
    SELECT
        "password"
    FROM
        users
    WHERE
        email = $1;
`;
  return query;
};

export const getUserByEmail = () => {
  const query = `--sql
    SELECT
        *
    FROM
        users
    WHERE
        email = $1;             
`;

  return query;
};

export const insertUrl = () => {
  const query = `--sql
    INSERT INTO
      "urls" ("url", "shortUrl")
    VALUES
      ($1, $2);
  `;
  return query;
};

export const getUrlIdbyshortUrl = () => {
  const query = `--sql
    SELECT
      id
    FROM
      urls
    WHERE
      "shortUrl" = $1;
  `;
  return query;
};

export const insertUrlsUsers = () => {
  const query = `--sql
    INSERT INTO
      "urlsUsers" ("urlId", "userid")
    VALUES
      ($1, $2);
  `;
  return query;
};

export const getshortUrlByUserIdAndUrl = () => {
  const query = `--sql
  SELECT
    urls."shortUrl"
  FROM
    "urlsUsers"
    JOIN urls ON "urlsUsers"."urlId" = urls.id
  WHERE
    urls.url = $1
    AND "urlsUsers"."userid" = $2;
`;
  return query;
};

export const getUrlById = () => {
  const query = `--sql
  SELECT
      "id",
      "url",
      "shortUrl"
  FROM
      "urls"
  WHERE
      "id" = $1;
  `;
  return query;
};

export const getVisitCountByShortId = () => {
  const query = `--sql
  SELECT
    "visitCount",
    "url"
  FROM
    urls
  WHERE
    "shortUrl" = $1;
  `;
  return query;
};

export const updateVisitCount = () => {
  const query = `--sql
  UPDATE
    urls
  SET
    "visitCount" = $1
  WHERE
    "shortUrl" = $2;
  `;
  return query;
};

export const getUserIdByUrlid = () => {
  const query = `--sql
  SELECT
    "urlsUsers"."userid" as "userId"
  FROM
    urls
    JOIN "urlsUsers" ON "urlsUsers"."urlId" = $1
  WHERE
    "urlsUsers"."userid" = $2
  LIMIT
    1;
  `;
  return query;
};

export const deleteUrl = () => {
  const query = `--sql
  DELETE FROM
      urls
  WHERE
      id = $1;
  `;
  return query;
};

export const deleteUrlsUsers = () => {
  const query = `--sql
  DELETE FROM
    "urlsUsers"
  WHERE
    "urlId" = $1;
  `;
  return query;
};

export const getRanking = () => {
  const query = `--sql
  SELECT
      users."id",
      users."name",
      COUNT(urls."visitCount") AS "linksCount",
      SUM(urls."visitCount") AS "visitCount"
  FROM
      "urlsUsers"
      JOIN "users" ON "users"."id" = "urlsUsers"."userid"
      JOIN "urls" ON "urls"."id" = "urlsUsers"."urlId"
  GROUP BY
      users."id",
      users."name"
  ORDER BY
      "visitCount" DESC
  LIMIT
      10;`;
  return query;
};

export const getUserUrls = () => {
  const query = `--sql
  SELECT
      "users"."id",
      "users"."name",
      SUM(urls."visitCount") AS "visitCount",
      json_agg(
          json_build_object(
              'id',
              "urls"."id",
              'shortUrl',
              "urls"."shortUrl",
              'url',
              "urls"."url",
              'visitCount',
              "urls"."visitCount"
          )
      ) AS "shortenedUrls"
  FROM
      "urlsUsers"
      JOIN users ON "urlsUsers"."userid" = "users"."id"
      JOIN urls ON "urlsUsers"."urlId" = "urls"."id"
  WHERE
      users.id = $1
  GROUP BY
      "users"."id"
  ORDER BY
      "visitCount" DESC;
  `;
  return query;
};
