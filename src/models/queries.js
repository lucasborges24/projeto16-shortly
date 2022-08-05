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

export const getUrlsUsersIdByUserIdAndUrl = () => {
  const query = `--sql
  SELECT
    "urlsUsers"."id"
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
  `
  return query;
}
