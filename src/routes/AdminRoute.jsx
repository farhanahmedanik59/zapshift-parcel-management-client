import React, { Children } from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { useNavigate } from "react-router";
import Login from "../pages/Auth/Login/Login";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <h1>Loading</h1>;
  }
  console.log(role);

  if (role !== "admin") {
    return <h1>Not a Admin</h1>;
  }

  return children;
};

export default AdminRoute;
