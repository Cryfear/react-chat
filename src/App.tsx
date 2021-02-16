import React from "react";

import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";

import "./normalize.css";
import "./index.scss";

const App = () => {
  return <div className="app">{false ? <Auth /> : <Home />}</div>;
};

export default App;
