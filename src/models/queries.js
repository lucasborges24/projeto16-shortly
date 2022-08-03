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

export const getSessionByUserId = () => {
  const query = `--sql
        SELECT 
            *
        FROM
            "sessions"
        WHERE
            "userId" = $1
    `;
  return query;
};

export const insertSession = () => {
  const query = `--sql
        INSERT INTO
            "sessions" ("userId", "token")
        VALUES
            ($1, $2)
    `;
  return query;
};

export const insertSessionWithoutToken = () => {
  const query = `--sql
          INSERT INTO
              "sessions" ("userId")
          VALUES
              ($1)
      `;
  return query;
};

export const updateSession = () => {
  const query = `--sql
        UPDATE
            "sessions"
        SET
            "token" = $1
        WHERE
            "userId" = $2
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
