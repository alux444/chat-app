import { Box } from "@mui/material";
import React, { useContext } from "react";
import { ChatContext, FriendContext } from "./Home";
import ChatBar from "./ChatBar";
import MessageBox from "./MessageBox";

const ChatRoom = () => {
  const { currentChat } = useContext(ChatContext);

  const chat = currentChat.map((chat) => (
    <Box
      sx={{ position: "relative", height: "85vh", border: "1px solid blue" }}
      key={chat.username}
    >
      <small>
        Currently chatting with : {chat.username} (
        {chat.connected ? "online" : "offline"})
      </small>
      <MessageBox />
      <Box sx={{ position: "absolute", bottom: 15, width: "100%" }}>
        <ChatBar />
      </Box>
    </Box>
  ));

  return <Box>{chat}</Box>;
};

export default ChatRoom;
