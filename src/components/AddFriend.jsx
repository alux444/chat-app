import {
  Modal,
  Typography,
  Box,
  Input,
  FormControl,
  Button,
} from "@mui/material";
import React, { useState } from "react";

const AddFriend = ({ open, close }) => {
  const [currentUsername, setCurrentUsername] = useState("");

  const handleUserChange = (e) => {
    if (e.target.value.length < 20) {
      setCurrentUsername(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert("Friend request sent to: " + currentUsername);
    setCurrentUsername("");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Modal open={open} onClose={close}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
          <Typography variant="small">Add a friend</Typography>

          <form onSubmit={onSubmit}>
            <Input
              sx={{ width: "300px" }}
              onChange={handleUserChange}
              placeholder="Username"
              type="text"
              value={currentUsername}
            />
            <Button type="submit">Add Friend!</Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddFriend;
