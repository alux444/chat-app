import React, { useContext, useState } from "react";
import { AccountContext } from "./AccountContext";
import { TextField, Box } from "@mui/material";
import { ChatContext } from "./Home";
import socket from "./socket";

const ChatBar = () => {
  const [message, setMessage] = useState("");
  const { user } = useContext(AccountContext);
  const { currentChat } = useContext(ChatContext);

  const handleChange = (e) => {
    if (e.target.value.length < 250) {
      setMessage(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (message.length === 0) {
      alert("Please enter a message.");
      return;
    }

    const submittedMessage = {
      username: user.username,
      message: message,
      chatroom: currentChat[0].username,
    };

    fetch(`${import.meta.env.VITE_SERVER_URL}/auth/messages`, {
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

        socket.emit("new-message", true);
      });

    setMessage("");
  };

  return (
    <Box sx={{ height: "100%" }}>
      <form onSubmit={onSubmit}>
        <TextField
          type="text"
          value={message}
          placeholder="Send a message!"
          onChange={handleChange}
          sx={{
            backgroundColor: "rgba(255,255,255,0.8)",
            color: "black",
            width: "calc(100% - 130px)",
            borderRadius: "20px",
          }}
        />
        <button style={{ width: "100px", height: "58px", margin: "0 5px" }}>
          Send Message
        </button>
      </form>
    </Box>
  );
};

export default ChatBar;
