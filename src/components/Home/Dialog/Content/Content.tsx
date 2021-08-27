import React from "react";
import Messages from "./Messages/Messages";
import {SendMessage} from "./SendMessage/SendMessage";

import "./Content.scss";

import arrowDown from '../../../../assets/down-arrow.png';

export const Content = () => {
  return (
    <div className="content">
      <Messages />
      <div className="content__arrow-to-bottom"><img src={arrowDown} alt="arr" /><span>99+</span></div>
      <SendMessage />
    </div>
  );
};
