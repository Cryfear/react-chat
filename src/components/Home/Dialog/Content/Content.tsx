import React from "react";
import { MessagesContainer } from "./Messages/MessagesContainer";
import { SendMessage } from "./SendMessage/SendMessage";

import "./Content.scss";

// import arrowDown from "../../../../assets/down-arrow.png";

export const Content = () => {
  return (
    <div className="content">
      <MessagesContainer />
      {/* <div className="content__arrow-to-bottom">
        <img src={arrowDown} alt="arr" />
        <span>99+</span>
      </div> */}
      <SendMessage />
    </div>
  );
};
