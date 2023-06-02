import dotenv from "dotenv";
dotenv.config();

export const corsConfig = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
