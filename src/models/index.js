import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const connection = new Pool(databaseConfig);

export { connection };
export * as queries from './queries.js'
export * as authModel from "./authModel.js";

