import express from "express";
import validate from "./validate.js";
import {
  handleLogin,
  attemptLogin,
  handleSignup,
  handleMessage,
  getMessages,
} from "./authControl.js";
import { rateLimiter } from "./rateLimiter.js";

const router = express.Router();

router
  .route("/login")
  .get(handleLogin)
  .post(validate, rateLimiter(20, 50), attemptLogin);

router.post("/signup", validate, rateLimiter(20, 60), handleSignup);

router.post("/messages", rateLimiter(20, 30), handleMessage);

router.get("/getmessages", getMessages);

export default router;
