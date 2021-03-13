import React, { useEffect } from "react";

import { Auth } from "./components/Auth/Auth";
import Home from "./components/Home/Home";

import "./styles/normalize.css";
import "./styles/index.scss";

import { Redirect, Route } from "react-router";
import { isAuth, isAuthData } from "./App.model";
import { useStore } from "effector-react";

export const App = () => {
  const store = useStore(isAuthData);

  useEffect(() => {
    if (store.isChecked !== true)
      isAuth({ email: sessionStorage["email"], authToken: sessionStorage["auth-token"] });
  });

  return (
    <div className="app">
      <Route path="/home" component={Home} />
      <Route path="/login" component={Auth} />
      {store.isAuth ? <Redirect children={<Home />} to="/home" /> : <Redirect children={Auth} to="/login" />}
    </div>
  );
};
