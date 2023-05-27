import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import session from "express-session";
import cors from "cors";
import router from "./routers/authRouter.js";
import dotenv from "dotenv";
dotenv.config();
import RedisStore from "connect-redis";
import { Redis } from "ioredis";

const app = express();
const port = 5173;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

let redisClient = new Redis();
let redisStore = new RedisStore({
  client: redisClient,
  session: session,
});

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());

app.use(
  session({
    store: redisStore,
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    resave: false,
    saveUninitialized: false,
    name: "sid",
    cookie: {
      secure: process.env.ENVIRONMENT === "production",
      httpOnly: true,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
      expires: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use("/auth", router);

app.get("/", (req, res) => {
  res.json("hello");
});

io.on("connect", (socket) => {});

app.listen(4000, () => {
  console.log("listening on " + port);
});
