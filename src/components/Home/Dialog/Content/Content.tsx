import React from "react";
import Messages from "./Messages/Messages";
import SendMessage from "./SendMessage/SendMesage";

import "./Content.scss";

const Content = () => {
  return (
    <div className="content">
      <Messages />
      <SendMessage />
    </div>
  );
};

export default Content;
