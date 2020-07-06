import React from "react";
import "antd/dist/antd.css";
import Auth from "./components/Auth/Auth";
import "./styles/global.scss";
import { BrowserRouter, Route } from "react-router-dom";
import HomeContainer from "./components/Home/HomeContainer";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path={["/", "/login", "/registration"]} render={Auth} />
        <Route path="/im" render={() => <HomeContainer />} />
      </BrowserRouter>
    </div>
  );
};

export default App;
