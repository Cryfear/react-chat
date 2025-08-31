import React, {  useMemo } from "react";
import { MessageItem } from "../components/Home/Dialog/Content/Messages/MessagesTypes/Text";
import { MessageType } from "../components/Home/Home.types";

export const useCreatingMessagesList = (
  messages: MessageType[],
  isEmptyDialog: boolean,
  onSendScrollRef: any
) => {
  return useMemo(() => {
    return !isEmptyDialog
      ? messages.map((item, index, array) => {
          return array.length === index + 1 ? (
            <div key={item._id} ref={onSendScrollRef}>
              <MessageItem
                {...item}
                mine={item.creater === sessionStorage["id"]}
              />
            </div>
          ) : (
            <MessageItem
              {...item}
              key={item._id}
              mine={item.creater === sessionStorage["id"]}
            />
          );
        })
      : messages;
  }, [messages, isEmptyDialog, onSendScrollRef]);
};
