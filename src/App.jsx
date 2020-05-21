import React from "react";
import "antd/dist/antd.css";
import Auth from "./pages/Auth/Auth";
import "./styles/global.scss";
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    </div>
  );
}

export default App;
