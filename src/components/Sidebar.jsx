import React, { useState, useContext } from "react";
import { Box, Button } from "@mui/material";
import { ChatContext, FriendContext } from "./Home";
import JoinRoom from "./JoinRoom";

const Sidebar = () => {
  const test = () => {};

  const { friendList } = useContext(FriendContext);
  const { setCurrentChat } = useContext(ChatContext);
  const [openAddFriend, setOpenAddFriend] = useState(false);

  const closeAddFriends = () => {
    setOpenAddFriend(false);
  };

  const openAddFriends = () => {
    setOpenAddFriend(true);
  };

  const friends = friendList.map((friend) => (
    <Box
      key={friend.username}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Button
        onClick={() =>
          setCurrentChat([
            {
              username: friend.username,
            },
          ])
        }
        size="small"
        sx={{
          display: "block",
          border: "3px solid transparent",
          width: "150px",
          padding: "5px",
          margin: "5px",
          borderRadius: "27px",
          backgroundColor: "rgba(255,255,255,0.8)",
          color: "black",
          "&:hover": {
            backgroundColor: "transparent",
            color: "white",
          },
        }}
      >
        <p>{friend.username}'s Room</p>
      </Button>
    </Box>
  ));

  return (
    <Box
      sx={{
        display: "inline-block",
        overflow: "auto",
        height: "100%",
        padding: "5px",
      }}
    >
      <Button
        onClick={openAddFriends}
        sx={{
          border: "3px solid transparent",
          width: "150px",
          height: "100px",
          padding: "5px",
          margin: "5px",
          borderRadius: "27px",
          backgroundColor: "rgba(255,255,255,0.8)",
          color: "black",
          "&:hover": {
            backgroundColor: "transparent",
            color: "white",
            border: "3px solid green",
          },
        }}
      >
        Join Room
      </Button>
      <Button
        sx={{
          border: "3px solid",
          width: "150px",
          height: "50px",
          padding: "5px",
          margin: "5px",
          borderRadius: "27px",
          backgroundColor: "rgba(255,255,255,0.8)",
          color: "black",
          "&:hover": {
            backgroundColor: "transparent",
            color: "white",
          },
        }}
        onClick={() =>
          setCurrentChat([{ username: "public", connected: true }])
        }
      >
        Public Chat
      </Button>
      {friends}
      <JoinRoom open={openAddFriend} close={closeAddFriends} />
    </Box>
  );
};

export default Sidebar;
