import React from "react";
import ReactDOM from "react-dom";
import { Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <App />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
