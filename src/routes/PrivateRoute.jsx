import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div>
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }
  if (user) {
    return children;
  } else {
    <Navigate to={"/login"}></Navigate>;
  }
};

export default PrivateRoute;
