import express from "express";
import validate from "./validate.js";
import { handleLogin, attemptLogin, handleSignup } from "./authControl.js";

const router = express.Router();

router.route("/login").get(handleLogin).post(validate, attemptLogin);

router.post("/signup", validate, handleSignup);

export default router;
