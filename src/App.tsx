import React, { useEffect } from "react";

import { Auth } from "./components/Auth/Auth";
import { Home } from "./components/Home/Home";

import "./styles/normalize.css";
import "./styles/index.scss";

import { Redirect, Route } from "react-router";
import { isLoginFx, isAuthData } from "./App.model";
import { useStore } from "effector-react";

export const App = () => {
  const store = useStore(isAuthData);

  useEffect(() => {
    if (!store.isChecked) {
      isLoginFx({
        email: sessionStorage["email"],
        authToken: sessionStorage["auth-token"],
      }).then((data) => data).catch(err => err);
    }
  }, [store.isChecked]);

  return (
    <div className="app">
      <Route path="/home" component={Home} />
      <Route path="/auth" component={Auth} />
      {store.isAuth ? (
        <Redirect to="/home" />
      ) : (
        <Redirect to="/auth/login" />
      )}
    </div>
  );
};
