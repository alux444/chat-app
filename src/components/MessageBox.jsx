import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import { AccountContext } from "./AccountContext";
import socket from "../../server/socket";
import { ChatContext } from "./Home";

const MessageBox = () => {
  const [allMessages, setAllMessages] = useState([]);
  const { user } = useContext(AccountContext);
  const { currentChat } = useContext(ChatContext);
  const [refresh, setRefresh] = useState(false);
  const latestMessages = useRef(null);

  useEffect(() => {
    scrollToBottom();
    console.log(currentChat[0].username);
  }, [allMessages]);

  const scrollToBottom = () => {
    latestMessages.current?.scrollIntoView({ behavior: "smooth" });
  };

  socket.on("received-message", () => {
    setRefresh(!refresh);
  });

  useEffect(() => {
    fetch(
      `http://localhost:4000/auth/getmessages?chatroom=${currentChat[0].username}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Process the messages received from the backend
          console.log(data.messages); // Use `data.messages` instead of `messages`
          setAllMessages(data.messages);
        } else {
          // Handle the case where retrieving messages failed
          console.log(data.message);
          setAllMessages("Couldnt get messages :(");
        }
      })
      .catch((error) => {
        // Handle any network or request errors
        console.log(error);
        setAllMessages("Couldnt get messages :(");
      });
  }, [refresh]);

  const mappedMessages = allMessages.map((message) => (
    <Box
      key={message.id}
      sx={{
        height: "min-content",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            alignSelf:
              message.username === user.username ? "flex-end" : "flex-start",
            padding: "5px",
            borderRadius: "10px",
          }}
        >
          {message.username === user.username ? "You" : message.username} (
          {message.time.slice(0, 10)})
        </Typography>
        <Typography
          sx={{
            alignSelf:
              message.username === user.username ? "flex-end" : "flex-start",
            border: "2px solid green",
            padding: "5px",
            borderRadius: "10px",
            wordBreak: "break-word",
            maxWidth: "80%",
            backgroundColor: "rgba(255,255,255,0.8)",
            color: "black",
            margin: "0 10px",
          }}
        >
          {message.message}
        </Typography>
      </Box>
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
      {mappedMessages}
      <div ref={latestMessages} />
    </Box>
  );
};

export default MessageBox;
