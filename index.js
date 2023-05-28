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
const port = 5173;
const server = createServer(app);
const io = new Server(server, {
  cors: cors,
});

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);
app.use("/auth", router);
app.get("/", (req, res) => {
  res.json("hello");
});

io.use(wrap(sessionMiddleware));
io.on("connect", (socket) => {
  console.log(socket.request.user.username);
});

app.listen(4000, () => {
  console.log("listening on " + port);
});
