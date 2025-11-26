import React from "react";
import { Content } from "./Content/Content";
import "./Dialog.scss";
import { HeaderWrapper } from "./Header/HeaderWrapper";

export const Dialog = () => {
  return (
    <div className="dialog__wrapper">
      <HeaderWrapper />
      <Content />
    </div>
  );
};
