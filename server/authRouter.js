import express from "express";
import validate from "./validate.js";
import { handleLogin, attemptLogin, handleSignup } from "./authControl.js";
import { rateLimiter } from "./rateLimiter.js";

const router = express.Router();

router
  .route("/login")
  .get(handleLogin)
  .post(validate, rateLimiter(10), attemptLogin);

router.post("/signup", validate, rateLimiter(3), handleSignup);

export default router;
