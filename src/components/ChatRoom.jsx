import { Box } from "@mui/material";
import React, { useContext } from "react";
import { ChatContext, FriendContext } from "./Home";
import ChatBar from "./ChatBar";
import MessageBox from "./MessageBox";

const ChatRoom = () => {
  const { currentChat } = useContext(ChatContext);

  const chat = currentChat.map((chat) => (
    <Box sx={{ position: "relative", height: "85vh" }} key={chat.username}>
      {chat.username == "public" ? (
        <small>Public Chat Room</small>
      ) : (
        <small>{chat.username}'s Chat Room</small>
      )}
      <MessageBox />
      <Box
        sx={{
          position: "absolute",
          bottom: 9,
          width: "100%",
          height: "58px",
          "@media (max-width: 600px)": {
            position: "initial",
            width: "100vw",
          },
        }}
      >
        <ChatBar />
      </Box>
    </Box>
  ));

  return <Box>{chat}</Box>;
};

export default ChatRoom;
