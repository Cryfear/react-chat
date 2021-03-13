import React from "react";
import { Route } from "react-router-dom";
import { Login } from "./Login/Login";
import { Registratation } from "./Registration/Registration";

export const Auth = () => {
  return (
    <div className="auth">
      <Route component={Login} path="/login" />
      <Route component={Registratation} path="/registration" />
    </div>
  );
};
