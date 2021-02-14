import React from "react";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";

const App = () => {
  return <div className="app">{false ? <Auth /> : <Home />}</div>;
};

export default App;
