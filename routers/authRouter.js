import express from "express";
import validate from "./validate.js";
import pool from "../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
  validate(req, res);
  console.log("test");

  const potentialLogin = await pool.query(
    "SELECT id, username FROM users u WHERE u.username=$1 AND u.password=$2",
    [req.body.username, req.body.password]
  );

  console.log(potentialLogin);

  if (potentialLogin.rowCount > 0) {
    const passwordMatch = bcrypt.compare(
      req.body.password,
      potentialLogin.rows[0].password
    );

    if (passwordMatch) {
      //login
      req.session.user = {
        username: req.body.username,
        id: potentialLogin.rows[0].id,
      };
      res.json({ loggedIn: true, username: req.body.username });
    } else {
      //dont login
      console.log("hhehee");
    }
  } else {
    res.json({ loggedIn: false, status: "Incorrect username or password" });
  }
});

router.post("/signup", async (req, res) => {
  validate(req, res);

  const existingUser = await pool.query(
    "SELECT username FROM users WHERE username=$1",
    [req.body.username]
  );

  if (existingUser.rowCount === 0) {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users(username,password) VALUES ($1,$2) RETURNING id, username",
      [req.body.username, hashedPass]
    );
    req.session.user = {
      username: req.body.username,
      id: newUserQuery.rows[0].id,
    };
    res.json({ loggedIn: true, username: req.body.username });
  } else {
    res.json({ loggedIn: false, status: "Username taken :(" });
  }
});

export default router;
