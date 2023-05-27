import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  database: process.env.VITE_DATABASE_NAME,
  host: process.env.VITE_DATABASE_HOST,
  password: process.env.VITE_DATABASE_PASSWORD,
  user: process.env.VITE_DATABASE_USER,
  port: process.env.VITE_DATABASE_PORT,
});

export default pool;
