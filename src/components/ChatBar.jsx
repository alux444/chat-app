import React, { useContext, useState } from "react";
import { AccountContext } from "./AccountContext";
import { Button, TextField } from "@mui/material";
import socket from "../../server/socket";

const ChatBar = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(AccountContext);

  const handleChange = (e) => {
    if (e.target.value.length < 250) {
      setMessage(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const submittedMessage = {
      username: user.username,
      message: message,
    };

    fetch("http://localhost:4000/auth/messages", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submittedMessage),
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
        else {
          setError(data.status);
        }

        socket.emit("new-message", true);
      });

    setMessage("");
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        sx={{ width: "500px" }}
        type="text"
        value={message}
        onChange={handleChange}
      />
      <Button size="large" type="submit">
        Send Message
      </Button>
    </form>
  );
};

export default ChatBar;
