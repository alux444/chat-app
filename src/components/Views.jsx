import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/*" element={<Login />} />
    </Routes>
  );
};

export default Views;
