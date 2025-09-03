import React, { useMemo } from "react";
import { MessageItem } from "../components/Home/Dialog/Content/Messages/MessagesTypes/Text";
import { MessageType } from "../components/Home/Home.types";

export const useCreatingMessagesList = (
  messages: MessageType[],
  isEmptyDialog: boolean,
  onSendScrollRef: any
) => {
  return useMemo(() => {
    return !isEmptyDialog
      ? messages.map((item: any, index, array) => {
        item.creater = item.creater || item.creater._id;
        item.dialog = item.dialog || item.dialog._id;
        console.log(item);
        return array.length === index + 1 ? (
          <MessageItem
            date={item.date}
            data={item.data}
            key={item._id}
            mine={item.creater === sessionStorage["id"]}
            isReaded={item.isReaded}
          />
        ) : (
          <MessageItem
            date={item.date}
            data={item.data}
            key={item._id}
            mine={item.creater === sessionStorage["id"]}
            isReaded={item.isReaded}
          />
        );
      })
      : messages;
  }, [messages, isEmptyDialog, onSendScrollRef]);
};
