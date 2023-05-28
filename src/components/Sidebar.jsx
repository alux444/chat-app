import React, { useState } from "react";
import { Box } from "@mui/material";

const Sidebar = () => {
  const test = () => {};

  const friends = <p>hello</p>;

  return (
    <Box sx={{ display: "block" }}>
      <p>sidebar</p>
      <button onClick={test}>aa</button>
      {friends}
    </Box>
  );
};

export default Sidebar;
