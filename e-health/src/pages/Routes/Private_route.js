import React from "react";
import { isAuthenticate } from "../Auth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const navigate = useNavigate();
  return !isAuthenticate() ? <Navigate to="/login" /> : <Component />;
};
export default PrivateRoute;
