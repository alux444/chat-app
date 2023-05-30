import React, { createContext, useContext, useState } from "react";
import { Box, Button } from "@mui/material";
import { AccountContext } from "./AccountContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ChatRoom from "./ChatRoom";

export const FriendContext = createContext();
export const ChatContext = createContext();

const Home = () => {
  const { user, setUser } = useContext(AccountContext);

  const [friendList, setFriendList] = useState([
    { username: user.username, connected: true },
  ]);
  const [currentChat, setCurrentChat] = useState([
    { username: "public", connected: true },
  ]);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({ loggedIn: false, username: null });
    navigate("/");
  };

  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      <ChatContext.Provider value={{ currentChat, setCurrentChat }}>
        <Box sx={{ position: "relative" }}>
          <Button
            onClick={handleLogout}
            size="large"
            color="error"
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            Logout?
          </Button>

          <p>Welcome, {user.username}</p>

          <Box
            sx={{
              display: "flex",
              height: "85vh",
              border: "1px solid black",
              borderRadius: "20px",
              "@media (max-width: 600px)": {
                display: "block",
                border: "none",
                height: "fit-content",
              },
            }}
          >
            <Box
              sx={{
                width: "200px",
                "@media (max-width: 600px)": {
                  height: "min-content",
                  width: "100vw",
                },
              }}
            >
              <Sidebar />
            </Box>
            <Box
              sx={{
                width: "70vw",
                "@media (max-width: 600px)": {
                  width: "100vw",
                },
              }}
            >
              <ChatRoom />
            </Box>
          </Box>
        </Box>
      </ChatContext.Provider>
    </FriendContext.Provider>
  );
};

export default Home;
