import React from "react";
import Content from "./Content/Content";
import Header from "./Header/Header";

import "./Dialog.scss";

const Dialog = () => {
  return (
    <div className="dialog__wrapper">
      <Header />
      <Content />
    </div>
  );
};

export default Dialog;
