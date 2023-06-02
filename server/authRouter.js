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

router.route("/login").get(handleLogin).post(validate, attemptLogin);

router.post("/signup", validate, handleSignup);

router.post("/messages", handleMessage);

router.get("/getmessages", getMessages);

export default router;
