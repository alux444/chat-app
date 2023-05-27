import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import cors from "cors";
import router from "./routers/authRouter.js";

const app = express();
const port = 5173;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: "true",
  },
});

app.use(helmet());
app.use(
  cors({
    origin: "http:/localhost:5173",
    credentials: "true",
  })
);

app.use(express.json());

app.use("/auth", router);

app.get("/", (req, res) => {
  res.json("hello");
});

io.on("connect", (socket) => {});

app.listen(4000, () => {
  console.log("listening on " + port);
});
