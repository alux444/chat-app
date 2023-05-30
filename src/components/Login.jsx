import React from "react";
import { Box, Button, Input, FormControl } from "@mui/material";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AccountContext } from "./AccountContext";

const Login = () => {
  const { setUser } = useContext(AccountContext);

  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const resetForm = () => {
    setCurrentPassword("");
    setCurrentUsername("");
  };

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

    const values = {
      username: currentUsername,
      password: currentPassword,
    };

    console.log(values);

    console.log(JSON.stringify(values));

    fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .catch((err) => {
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setUser({ ...data });
        console.log(data);
        if (data.loggedIn) {
          navigate("/home");
        } else {
          setError(data.status);
        }
      });

    resetForm();
  };

  return (
    <Box
      sx={{
        width: "500px",
        margin: "auto",
        justifyContent: "center",
        border: "1px solid white",
        background: "rgba(255,255,255,0.1)",
      }}
    >
      <p>Login</p>

      <form onSubmit={onSubmit}>
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
        <Button type="submit">Login</Button>

        <Link to="/signup">
          <Button>Create Account</Button>
        </Link>
      </form>
    </Box>
  );
};

export default Login;
