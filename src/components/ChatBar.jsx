import React, { useContext, useState } from "react";
import UserContext from "./AccountContext";
import { Button, TextField } from "@mui/material";

const ChatBar = () => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.value.length < 250) {
      setMessage(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const submittedMessage = message;
    console.log(message);
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
