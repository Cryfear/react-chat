import React, { RefObject, useMemo } from "react";
import { MessageItem } from "../components/Home/Dialog/Content/Messages/MessagesTypes/Text";

export const useCreatingMessagesList = (
  messages: any,
  isEmptyDialog: boolean,
  onSendScrollRef: RefObject<HTMLDivElement>
) => {
  return useMemo(() => {
    return !isEmptyDialog
      ? messages.map((item: any, index: number, array: []) => {
          return array.length === index + 1 ? (
            <div key={item._id} ref={onSendScrollRef}>
              <MessageItem
                {...item}
                mine={item.creater === sessionStorage["id"] ? true : false}
              />
            </div>
          ) : (
            <MessageItem
              {...item}
              key={item._id}
              mine={item.creater === sessionStorage["id"] ? true : false}
            />
          );
        })
      : messages;
  }, [messages, isEmptyDialog, onSendScrollRef]);
};
