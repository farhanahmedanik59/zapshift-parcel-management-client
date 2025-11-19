import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";
import authimage from "../assets/authImage.png";
const AuthLayout = () => {
  return (
    <div className="max-w-[95%] mx-auto">
      <Logo></Logo>
      <div className="flex">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <div className="flex-1 ">
          <img src={authimage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
