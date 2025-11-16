import React from "react";
import { Outlet } from "react-router";
import Footer from "../pages/shared/Footer/Footer";

const Root = () => {
  return (
    <div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
