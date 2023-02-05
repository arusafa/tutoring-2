import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const ProtectedProvider = ({ children }) => {
  const { user } = auth;

  console.log("Check user in Private: ", user);
  if (!user) {
    return  <Navigate to="/landing" />;
  }
  return children.user;
};

export default ProtectedProvider;