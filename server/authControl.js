import pool from "../db.js";
import bcrypt from "bcrypt";

export const handleLogin = (req, res) => {
  if (req.session.user && req.session.user.username) {
    console.log("in");
    res.json({ loggedIn: true, username: req.session.user.username });
  } else {
    res.json({ loggedIn: false });
  }
};

export const attemptLogin = async (req, res) => {
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
};

export const handleSignup = async (req, res) => {
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
};

export const handleMessage = async (req, res) => {
  const { message, username } = req.body;
  console.log(message, username);

  try {
    const insertMessageQuery = await pool.query(
      "INSERT INTO messages (message, username) VALUES ($1, $2) RETURNING id, message, username",
      [message, username]
    );

    res.json({ success: true, message: "Message added to the database." });
  } catch (error) {
    res.json({ success: false, message: "Failed to add the message." });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await pool.query("SELECT * FROM messages");
    res.json({ success: true, messages: messages.rows });
  } catch (error) {
    res.json({ success: false, message: "Failed to retrieve messages." });
  }
};
