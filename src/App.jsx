import React from "react";
import "antd/dist/antd.css";
import Auth from "./pages/Auth/Auth";
import "./styles/global.scss";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path={["/", "/login", "/registration"]} render={Auth} />
        <Route path="/im" render={() => <Home />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
