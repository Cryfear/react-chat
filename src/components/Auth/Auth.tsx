import React from "react";
import { Route } from "react-router-dom";
import { LoginContainer } from "./Login/LoginContainer";
import { Registratation } from "./Registration/Registration";

export const Auth = () => {
  return (
    <div className="auth">
      <Route component={LoginContainer} path="/login" />
      <Route component={Registratation} path="/registration" />
    </div>
  );
};
