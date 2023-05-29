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
const io = new Server(server);

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);
app.use("/auth", router);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(4000, () => {
  console.log("listening on 4000");
});
