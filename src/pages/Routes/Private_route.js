import React from "react";
import { isAuthenticate } from "../Auth";
import { Route, Navigate, useNavigate, Routes } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const navigate = useNavigate();
  return !isAuthenticate() ? <Navigate to="/login" /> : <Component />;
};
export default PrivateRoute;
