import React from "react";
import { Route } from "react-router-dom";
import { LoginContainer } from "./Login/LoginContainer";
import { Registratation } from "./Registration/Registration";

export const Auth = () => {
  return (
    <div className="auth">
      <Route exact component={LoginContainer} path="/auth/login" />
      <Route exact component={Registratation} path="/auth/registration" />
    </div>
  );
};
