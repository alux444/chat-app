import express from "express";
import validate from "./validate.js";
import pool from "../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", (req, res) => {
  validate(req, res);
});

router.post("/signup", async (req, res) => {
  validate(req, res);

  const existingUser = await pool.query(
    "SELECT username FROM users WHERE username=$1",
    [req.body.username]
  );

  if (existingUser.rowCount === 0) {
    //register
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users(username,password) VALUES ($1,$2) RETURNING username",
      [req.body.username, hashedPass]
    );
    res.json({ loggedIn: true, username });
  } else {
    res.json({ loggedIn: false, status: "Username taken :(" });
  }
});

export default router;
