import React from "react";
import Header from "../Header/Header";
import MessagesWrapper from "./MessagesWrapper";
import MessagesInputWrapper from "./MessagesInputWrapper";

const Messages = props => {
  return (
    <div className="messages">
      <Header />
      <MessagesWrapper />
      <MessagesInputWrapper />
    </div>
  );
};

export default Messages;
