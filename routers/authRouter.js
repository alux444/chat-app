import express from "express";
import validate from "./validate.js";
const router = express.Router();

router.post("/login", (req, res) => {
  validate(req, res);
});

router.post("/signup", (req, res) => {
  validate(req, res);
});

export default router;
