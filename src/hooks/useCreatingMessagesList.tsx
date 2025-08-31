import React, {  useMemo } from "react";
import { MessageItem } from "../components/Home/Dialog/Content/Messages/MessagesTypes/Text";

export type MessageType = {
  createdAt: string, // во сколько создано сообщение
  creater: string, // кто его написал,
  date: string, // когда было создано сообщение изначально
  data: string, // содержание сообщения
  dialog: string, // айди диалога
  isReaded: boolean, // прочитал ли собеседник это сообщение
  updatedAt: string // если сообщение было редактировано, будем знать когда
  _id: string, // айди сообщения
}

export const useCreatingMessagesList = (
  messages: [MessageType],
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
