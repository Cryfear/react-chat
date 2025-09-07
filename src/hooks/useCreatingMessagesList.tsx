import React from "react";
import { MessageItem } from "../components/Home/Dialog/Content/Messages/MessagesTypes/Text";
import { MessageType } from "../components/Home/Home.types";

export const creatingMessagesList = (
  messages: MessageType[],
  onSendScrollRef: any,
  myId: string
) => {
  return messages.map((item: any, index) => {
    const isLastMessage = index === messages.length - 1;

    return <div key={item._id} ref={isLastMessage ? onSendScrollRef : undefined}>
      <MessageItem
        {...item}
        mine={item.creater === myId}
      />
    </div>
  })
};
