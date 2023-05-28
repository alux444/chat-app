import React, { useState, useContext } from "react";
import { Box, Button, Container } from "@mui/material";
import { ChatContext, FriendContext } from "./Home";

const Sidebar = () => {
  const test = () => {
    console.log(setCurrentChat);
    setCurrentChat([]);
  };

  const { friendList, setFriendList } = useContext(FriendContext);
  const { setCurrentChat } = useContext(ChatContext);

  const friends = friendList.map((friend) => (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        onClick={() =>
          setCurrentChat([
            {
              username: friend.username,
              connected: friend.connected,
            },
          ])
        }
        sx={{
          display: "block",
          border: "3px solid",
          borderColor: friend.connected ? "green" : "red",
          height: "min-content",
          width: "150px",
          padding: "5px",
          margin: "1  5px",
          borderRadius: "27px",
        }}
      >
        <h3>{friend.username}</h3>
        <small>{friend.connected ? "Online" : "Offline"}</small>
      </Button>
    </Box>
  ));

  return (
    <Box sx={{ display: "inline-block" }}>
      <p>sidebar</p>
      <button onClick={test}>aa</button>
      <Button
        sx={{
          width: "150px",
          padding: "5px",
          margin: "1  5px",
          borderRadius: "27px",
        }}
        onClick={() =>
          setCurrentChat([{ username: "public", connected: true }])
        }
      >
        Public Chat
      </Button>
      {friends}
    </Box>
  );
};

export default Sidebar;
