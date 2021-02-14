import React from "react";
import MessagesItem from "./MessagesTypes/Text";

const Messages = () => {
  return (
    <div className="content__messages">
      <MessagesItem />
      <MessagesItem />
      <MessagesItem />
      <MessagesItem />
    </div>
  );
};

export default Messages;
