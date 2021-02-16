import React from "react";
import TextMessage from "./MessagesTypes/Text";

import "./MessagesTypes.scss";

const Messages = () => {
  return (
    <div className="content__messages">
      <TextMessage mine={true} />
      <TextMessage mine={false} />
      <TextMessage mine={false} />
      <TextMessage mine={true} />
    </div>
  );
};

export default Messages;
