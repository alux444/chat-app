import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, FormControl, Input } from "@mui/material";
import { useState } from "react";

const SignUp = () => {
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmingPassword, setConfirmingPassword] = useState("");
  const [submission, setSubmission] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const resetForm = () => {
    setCurrentPassword("");
    setCurrentUsername("");
    setConfirmingPassword("");
  };

  const handleUserChange = (e) => {
    if (e.target.value.length < 20) {
      setCurrentUsername(e.target.value);
    }
  };

  const handlePassChange = (e) => {
    if (e.target.value.length < 30) {
      setCurrentPassword(e.target.value);
    }
  };

  const handleConfPassChange = (e) => {
    if (e.target.value.length < 30) {
      setConfirmingPassword(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (currentUsername.length < 6) {
      return setError("Username is to short");
    } else if (currentPassword.length < 1) {
      return setError("Please enter a password");
    }

    if (currentPassword !== confirmingPassword) {
      return setError("Passwords do not match");
    }

    setSubmission({
      username: currentUsername,
      password: currentPassword,
    });

    console.log(submission);

    fetch("http://localhost:4000"),
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      };

    resetForm();
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
        <small>Minimum 6 characters</small>
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
        <small>Minimum 6 characters</small>
        <Input
          sx={{ width: "300px" }}
          onChange={handlePassChange}
          placeholder="Password"
          type="password"
          value={currentPassword}
        />
      </FormControl>

      <FormControl sx={{ margin: "10px", padding: "10px" }}>
        <label>Confirm Password</label>
        <Input
          sx={{ width: "300px" }}
          onChange={handleConfPassChange}
          placeholder="Password"
          type="password"
          value={confirmingPassword}
        />
      </FormControl>

      <p>{error}</p>
      <form>
        <Button onClick={onSubmit}>Sign up!</Button>
        <Link to="/">
          <Button>Already have an account?</Button>
        </Link>
      </form>
    </Box>
  );
};

export default SignUp;
