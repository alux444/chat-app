import React from "react";
import { Box, Button, Input, FormControl } from "@mui/material";
import { useState } from "react";

const Login = () => {
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [submission, setSubmission] = useState({
    username: "",
    password: "",
  });

  const handleUserChange = (e) => {
    setCurrentUsername(e.target.value);
  };

  const handlePassChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmission(
      (submission.username = currentUsername),
      (submission.password = currentPassword)
    );
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

      <FormControl sx={{ width: "400px" }}>
        <label>Username</label>
        <Input
          onChange={handleUserChange}
          placeholder="Username"
          required="true"
          type="text"
          value={currentUsername}
        />
      </FormControl>

      <FormControl sx={{ width: "400px" }}>
        <label>Password</label>
        <Input
          onChange={handlePassChange}
          placeholder="Password"
          required="true"
          type="password"
          value={currentPassword}
        />
      </FormControl>

      <form>
        <Button onClick={onSubmit}>Login</Button>
        <Button>Create Account</Button>
      </form>
    </Box>
  );
};

export default Login;
