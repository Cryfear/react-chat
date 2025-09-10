import React from "react";
import ReactDOM from "react-dom";
import { Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "@radix-ui/themes/styles.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
        <App />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
