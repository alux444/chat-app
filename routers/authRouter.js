import express from "express";
import validate from "./validate.js";
import pool from "../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router
  .route("/login")
  .get(async (req, res) => {
    if (req.session.user && req.session.user.username) {
      console.log("in");
      res.json({ loggedIn: true, username: req.session.user.username });
    } else {
      res.json({ loggedIn: false });
    }
  })
  .post(async (req, res) => {
    validate(req, res);

    const potentialLogin = await pool.query(
      "SELECT id, username, password FROM users WHERE username=$1",
      [req.body.username]
    );

    if (potentialLogin.rowCount > 0) {
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        potentialLogin.rows[0].password
      );

      if (passwordMatch) {
        req.session.user = {
          username: req.body.username,
          id: potentialLogin.rows[0].id,
        };
        res.json({ loggedIn: true, username: req.body.username });
      } else {
        //dont login
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

    console.log(hashedPass);

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
