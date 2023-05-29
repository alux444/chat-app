import session from "express-session";
import RedisStore from "connect-redis";
import redisClient from "../redis.js";
import dotenv from "dotenv";
dotenv.config();

export const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET,
  credentials: true,
  resave: false,
  store: new RedisStore({ client: redisClient }),
  saveUninitialized: false,
  name: "sid",
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: 1000 * 60 * 60 * 24 * 7,
  },
});

export const wrap = (expressMiddleware) => (socket, next) =>
  expressMiddleware(socket.request, {}, next);

export const corsConfig = {
  origin: "http://localhost:5173",
  credentials: true,
};
