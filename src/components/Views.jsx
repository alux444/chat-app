import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import PrivateRoutes from "./PrivateRoutes";
import { AccountContext } from "./AccountContext";

const Views = () => {
  const { user } = useContext(AccountContext);
  const navigate = useNavigate();
  const [initialRedirect, setInitialRedirect] = useState(false);

  useEffect(() => {
    if (user.loggedIn && !initialRedirect) {
      navigate("/home");
      setInitialRedirect(true);
    }
  }, [user.loggedIn, navigate, initialRedirect]);

  return user.loggedIn === null ? (
    ""
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Views;
