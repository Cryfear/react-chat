import React from "react";
import Messages from "./Messages/Messages";
import {SendMessage} from "./SendMessage/SendMessage";

import "./Content.scss";

export const Content = () => {
  return (
    <div className="content">
      <Messages />
      <SendMessage />
    </div>
  );
};
