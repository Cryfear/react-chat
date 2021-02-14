import React from "react";
import Login from "./Login/Login";
import Registratation from "./Registration/Registration";

const Auth = () => {
  return true ? <Login /> : <Registratation />;
};

export default Auth;
