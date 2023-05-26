import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

const SignUp = () => {
  return (
    <div>
      <p>Signup</p>
      <Link to="/">
        <Button>Already have an account?</Button>
      </Link>
    </div>
  );
};

export default SignUp;
