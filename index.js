import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import cors from "cors";
import router from "./server/authRouter.js";
import dotenv from "dotenv";
dotenv.config();
import { sessionMiddleware, wrap, corsConfig } from "./server/serverControl.js";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: corsConfig,
});

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);
app.use("/auth", router);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

io.use(wrap(sessionMiddleware));
io.on("connect", (socket) => {
  console.log("hello");
  console.log(socket.request.user.username);
});

app.listen(4000, () => {
  console.log("listening on 4000");
});
