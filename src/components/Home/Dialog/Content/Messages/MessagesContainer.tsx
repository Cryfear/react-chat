import React from "react";

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
import { useCreatingMessagesList } from "../../../../../hooks/useCreatingMessagesList";

export const MessagesContainer = () => {
  const { currentDialog, messageSent, currentDialogMessages } =
    useStore(HomeStore);

  const scrollRef: React.RefObject<HTMLDivElement> = useRef(null);
  const onSendScrollRef: React.RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (onSendScrollRef !== null && onSendScrollRef.current) {
      const executeScroll = () => {
        if (scrollRef.current)
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
      if (scrollRef.current)
        scrollRef.current.scrollTop =
          scrollRef.current.scrollTop - 85 * data.messages.length;
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
  const messages = useCreatingMessagesList(
    currentDialogMessages,
    isEmptyDialog,
    onSendScrollRef
  );

  return isEmptyDialog ? (
    <EmptyDialog />
  ) : (
    <Messages scrollRef={scrollRef} messages={messages} />
  );
};
