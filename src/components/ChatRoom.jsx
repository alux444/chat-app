import { Box } from "@mui/material";
import React, { useContext } from "react";
import { ChatContext, FriendContext } from "./Home";

const ChatRoom = () => {
  const { currentChat, setCurrentChat } = useContext(ChatContext);

  const chat = currentChat.map((chat) => (
    <Box>
      <p>Chat Room</p>
      <small>
        Currently chatting with : {chat.username} (
        {chat.connected ? "online" : "offline"})
      </small>
    </Box>
  ));

  return <Box>{chat}</Box>;
};

export default ChatRoom;
