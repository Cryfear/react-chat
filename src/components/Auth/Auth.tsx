import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login/Login";
import Registratation from "./Registration/Registration";

const Auth = () => {
  return (
    <div className="auth">
      <BrowserRouter>
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={Registratation} path="/registration" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Auth;
