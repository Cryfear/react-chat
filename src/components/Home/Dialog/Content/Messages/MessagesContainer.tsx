import React from "react";
import { MessageItem } from "./MessagesTypes/Text";

import "./MessagesTypes.scss";
import { useStore } from "effector-react";
import {
  HomeStore,
  messageSentSwitcher,
  setUnreadMessagesFx,
} from "../../../Home.model";

import { useRef } from "react";
import { useEffect } from "react";
import { EmptyDialog } from "../EmptyDialog/EmptyDialog";
import { Messages } from "./Messages";

export const MessagesContainer = () => {
  const { currentDialog, messageSent, currentDialogMessages } =
    useStore(HomeStore);

  const scrollRef: any = useRef(null);
  const onSendScrollRef: any = useRef(null);

  useEffect(() => {
    if (onSendScrollRef !== null && onSendScrollRef.current) {
      const executeScroll = () => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      };

      if (messageSent) {
        executeScroll();
        messageSentSwitcher();
      }
    }

    setUnreadMessagesFx({
      dialogId: currentDialog.id,
      userId: currentDialog.opponentId,
    }).then((data) => {
       scrollRef.current.scrollTop = scrollRef.current.scrollTop - 850;
      // пока что работает только на 10 сообщений
    });
  }, [
    onSendScrollRef,
    messageSent,
    currentDialog.id,
    currentDialog.opponentId,
  ]);

  const isEmptyDialog = !(
    currentDialogMessages && currentDialogMessages.length > 0
  );

  const messages = !isEmptyDialog
    ? currentDialogMessages.map((item: any, index: number, array) => {
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
    : currentDialogMessages;

  return isEmptyDialog ? (
    <EmptyDialog />
  ) : (
    <Messages scrollRef={scrollRef} messages={messages} />
  );
};
