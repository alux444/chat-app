import session from "express-session";
import pgSession from "connect-pg-simple";
import pool from "../db.js";

const pgSessionStore = pgSession(session);

const sessionStore = new pgSessionStore({
  pool,
  tableName: "session",
});

export const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET,
  credentials: true,
  resave: false,
  store: sessionStore,
  saveUninitialized: false,
  name: "sid",
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: 1000 * 60 * 60 * 24 * 7,
  },
});
