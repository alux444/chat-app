import React from "react";
import { Box, Button, Input, FormControl } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [submission, setSubmission] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleUserChange = (e) => {
    setCurrentUsername(e.target.value);
  };

  const handlePassChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (currentUsername.length < 6) {
      return setError("Invalid username");
    } else if (currentPassword.length < 1) {
      return setError("Please enter a password");
    }

    setSubmission({
      username: currentUsername,
      password: currentPassword,
    });
    console.log(submission);
  };

  return (
    <Box
      sx={{
        width: "500px",
        margin: "auto",
        justifyContent: "center",
        height: "100vh",
        border: "1px solid white",
        background: "rgba(255,255,255,0.1)",
      }}
    >
      <p>Login</p>

      <FormControl sx={{ margin: "10px", padding: "10px" }}>
        <label>Username</label>
        <Input
          sx={{ width: "300px" }}
          onChange={handleUserChange}
          placeholder="Username"
          type="text"
          value={currentUsername}
        />
      </FormControl>

      <FormControl sx={{ margin: "10px", padding: "10px" }}>
        <label>Password</label>
        <Input
          sx={{ width: "300px" }}
          onChange={handlePassChange}
          placeholder="Password"
          type="password"
          value={currentPassword}
        />
      </FormControl>

      <p>{error}</p>
      <form>
        <Button onClick={onSubmit}>Login</Button>
        <Link to="/signup">
          <Button>Create Account</Button>
        </Link>
      </form>
    </Box>
  );
};

export default Login;
