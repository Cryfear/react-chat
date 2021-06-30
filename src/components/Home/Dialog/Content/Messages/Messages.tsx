import React from "react";
import { MessageItem } from "./MessagesTypes/Text";

import "./MessagesTypes.scss";
import { useStore } from "effector-react";
import { HomeStore } from "../../../Home.model";

const Messages = () => {
  const store = useStore(HomeStore);
  const messages =
    store.currentDialogMessages.length > 0
      ? store.currentDialogMessages.map((item, index) => {
          return <MessageItem text={item.data} mine={true} key={index} />;
        })
      : "";

  return <div className="content__messages">{messages}</div>;
};

export default Messages;
