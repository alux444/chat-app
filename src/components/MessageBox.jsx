import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import { AccountContext } from "./AccountContext";
import socket from "../../server/socket";

const MessageBox = () => {
  const [allMessages, setAllMessages] = useState([]);
  const { user } = useContext(AccountContext);
  const [refresh, setRefresh] = useState(false);
  const latestMessages = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  const scrollToBottom = () => {
    latestMessages.current?.scrollIntoView({ behavior: "smooth" });
  };

  socket.on("received-message", () => {
    setRefresh(!refresh);
  });

  useEffect(() => {
    fetch("http://localhost:4000/auth/getmessages")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Process the messages received from the backend
          console.log(data.messages); // Use `data.messages` instead of `messages`
          setAllMessages(data.messages);
        } else {
          // Handle the case where retrieving messages failed
          console.log(data.message);
        }
      })
      .catch((error) => {
        // Handle any network or request errors
        console.log(error);
      });
  }, [refresh]);

  const test = () => {
    console.log(refresh);
  };

  const mappedMessages = allMessages.map((message) => (
    <Box
      key={message.id}
      sx={{
        height: "min-content",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          float: message.username === user.username ? "right" : "left",
          border: "2px solid green",
          padding: "5px",
          borderRadius: "10px",
        }}
      >
        {message.username} : {message.message}
      </Typography>
    </Box>
  ));

  return (
    <Box
      sx={{
        border: "1px solid red",
        height: "85%",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <button onClick={test}>aaa</button>
      {mappedMessages}
      <div ref={latestMessages} />
    </Box>
  );
};

export default MessageBox;
