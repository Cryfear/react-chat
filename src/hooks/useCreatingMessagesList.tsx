import React from "react";
import { MessageItem } from "@components/Home/Dialog/Content/Messages/MessagesTypes/Text";
import { MessageType } from "@/types/Home.types";
import Voice from "@components/Home/Dialog/Content/Messages/MessagesTypes/Voice";

export const creatingMessagesList = (messages: MessageType[], onSendScrollRef: React.RefObject<HTMLDivElement | null>, myId: string) => {
  return messages.map((item: MessageType, index: number) => {
    const isLastMessage = index === messages.length - 1;

    if (item?.enum?.includes("audio")) {
      return <Voice audioURL={"http://localhost:8888" + item.data} key={item._id} />;
    }

    return item ? (
      <div key={item._id} ref={isLastMessage ? onSendScrollRef : undefined}>
        <MessageItem {...item} mine={item.creater === myId} />
      </div>
    ) : null;
  });
};
