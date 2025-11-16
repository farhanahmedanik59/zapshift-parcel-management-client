import React from "react";
import logo from "../../assets/logo.png";
const Logo = () => {
  return (
    <div className="flex items-center gap-1 font-bold">
      <img src={logo} alt="" />
      <h3 className="text-3xl -ms-4"> zapShift</h3>
    </div>
  );
};

export default Logo;
