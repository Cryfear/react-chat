import React from "react";
import Messages from "./Messages/Messages";
import SendMessage from "./SendMessage/SendMesage";

const Content = () => {
  return (
    <div className="content">
      <Messages />
      <SendMessage />
    </div>
  );
};

export default Content;
