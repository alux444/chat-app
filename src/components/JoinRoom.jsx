import { Modal, Box, Input } from "@mui/material";
import React, { useContext, useState } from "react";
import { FriendContext } from "./Home";

const JoinRoom = ({ open, close }) => {
  const { friendList, setFriendList } = useContext(FriendContext);

  const [currentUsername, setCurrentUsername] = useState("");

  const handleUserChange = (e) => {
    if (e.target.value.length < 20) {
      setCurrentUsername(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert("Joined " + currentUsername + "'s Room!");
    setCurrentUsername("");
    setFriendList([...friendList, { username: currentUsername }]);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Modal open={open} onClose={close}>
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: "20px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <form
            onSubmit={onSubmit}
            sx={{ width: "100%", display: "flex", gap: "15px" }}
          >
            <Input
              sx={{ width: "70%" }}
              onChange={handleUserChange}
              placeholder="Username"
              type="text"
              value={currentUsername}
            />
            <button style={{ width: "25%", margin: "5px" }} type="submit">
              Join room!
            </button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default JoinRoom;
