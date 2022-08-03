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
