import { Pool } from "pg";

const pool = new Pool({
  database: import.meta.env.VITE_DATABASE_NAME,
  host: import.meta.env.VITE_DATABASE_HOST,
  password: import.meta.env.VITE_DATABASE_PASSWORD,
  user: import.meta.env.VITE_DATABASE_USER,
  port: import.meta.env.VITE_DATABASE_PORT,
});

export default pool;
