import { createServer } from "http";
import helmet from "helmet";
import cors from "cors";
import router from "./server/authRouter.js";
import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import { sessionMiddleware, corsConfig } from "./server/serverControl.js";

const app = express();
const server = createServer(app);

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);
app.use("/auth", router);
app.set("trust proxy", 1);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected. Socket ID:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected. Socket ID:", socket.id);
  });

  socket.on("new-message", (boolean) => {
    console.log(boolean);
    io.emit("received-message", true);
  });
});

server.listen(4000, () => {
  console.log("Socket.IO server listening on port 4000");
});
