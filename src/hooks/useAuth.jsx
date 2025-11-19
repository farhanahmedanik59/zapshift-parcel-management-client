import React, { useContext } from "react";
import { AuthContex } from "../contexts/AuthContex/AuthContex";

const useAuth = () => {
  const authinfo = useContext(AuthContex);
  return authinfo;
};

export default useAuth;
