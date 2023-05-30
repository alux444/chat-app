import React from "react";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ padding: "10px", marginBottom: "20px" }}>
      <hr></hr>
      <small>© 2023 alux444</small>
      <p>
        <a
          href="https://github.com/alux444"
          target="_blank"
          rel="noreferrer"
          style={{ margin: "10px" }}
        >
          Github
        </a>
        <a
          href="https://alux444.github.io"
          target="_blank"
          rel="noreferrer"
          style={{ margin: "10px" }}
        >
          Portfolio
        </a>
        <a
          href="https://www.linkedin.com/in/alex-liang-7b25a6269/"
          target="_blank"
          rel="noreferrer"
          style={{ margin: "10px" }}
        >
          LinkedIn
        </a>
      </p>
    </Box>
  );
};

export default Footer;
