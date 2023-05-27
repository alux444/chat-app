import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { AccountContext } from "./AccountContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, setUser } = useContext(AccountContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({ loggedIn: false, username: null });
    navigate("/");
  };

  return (
    <Box>
      <Button onClick={handleLogout}>Logout?</Button>
      <p>hello, {user.username}</p>
    </Box>
  );
};

export default Home;
