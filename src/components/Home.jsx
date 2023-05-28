import React, { createContext, useContext } from "react";
import { Box, Button } from "@mui/material";
import { AccountContext } from "./AccountContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export const FriendContext = createContext();

const Home = () => {
  const { user, setUser } = useContext(AccountContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({ loggedIn: false, username: null });
    navigate("/");
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        onClick={handleLogout}
        size="large"
        sx={{ position: "absolute", top: 0, right: 0 }}
      >
        Logout?
      </Button>

      <p>Welcome, {user.username}</p>

      <Box
        sx={{
          display: "flex",
          height: "85vh",
          border: "2px solid red",
        }}
      >
        <Box sx={{ width: "200px" }}>
          <Sidebar />
        </Box>
        <Box
          sx={{
            width: "70vw",
            border: "1px solid black",
          }}
        >
          <p>Public chat room</p>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
