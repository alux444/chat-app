import React, { useState, useContext } from "react";
import { Box, Button } from "@mui/material";
import { ChatContext, FriendContext } from "./Home";
import AddFriend from "./AddFriend";

const Sidebar = () => {
  const test = () => {};

  const { friendList, setFriendList } = useContext(FriendContext);
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
              connected: friend.connected,
            },
          ])
        }
        size="small"
        sx={{
          display: "block",
          border: "3px solid",
          borderColor: friend.connected ? "green" : "red",
          width: "150px",
          padding: "5px",
          margin: "5px",
          borderRadius: "27px",
          backgroundColor: "rgba(255,255,255,0.8)",
          color: "black",
        }}
      >
        <h3>{friend.username}</h3>
        <small>{friend.connected ? "Online" : "Offline"}</small>
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
      <button onClick={test}>aa</button>
      <Button
        onClick={openAddFriends}
        sx={{
          width: "150px",
          padding: "5px",
          margin: "1  5px",
          borderRadius: "15px",
        }}
      >
        Add Friend
      </Button>
      <Button
        sx={{
          width: "150px",
          padding: "5px",
          margin: "1  5px",
          borderRadius: "15px",
        }}
        onClick={() =>
          setCurrentChat([{ username: "public", connected: true }])
        }
      >
        Public Chat
      </Button>
      {friends}
      <AddFriend open={openAddFriend} close={closeAddFriends} />
    </Box>
  );
};

export default Sidebar;
