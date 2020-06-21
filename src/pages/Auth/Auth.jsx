import React from "react";
import "./Auth.scss";
import { Route } from "react-router-dom";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";

const Auth = props => {
  return (
    <div className="auth">
      <Route
        exact
        path="/"
        render={() => {
          return <Login />;
        }}
      />
      <Route
        exact
        path="/registration"
        render={() => {
          return <Registration />;
        }}
      />
    </div>
  );
};

export default Auth;
