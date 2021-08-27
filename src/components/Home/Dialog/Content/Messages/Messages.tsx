import React from "react";
import { MessageItem } from "./MessagesTypes/Text";

import "./MessagesTypes.scss";
import { useStore } from "effector-react";
import {
  HomeStore,
  messageSentSwitcher,
  onScrollLoaderMessages,
  setUnreadMessagesFx,
} from "../../../Home.model";

import svg from "../../../../../assets/waving-hand.svg";
import { useRef } from "react";
import { useEffect } from "react";

const Messages = () => {
  const store = useStore(HomeStore);
  const scrollRef: any = useRef(null);
  const onSendScrollRef: any = useRef(null);

  useEffect(() => {
    if (onSendScrollRef !== null && onSendScrollRef.current) {
      const executeScroll = () =>
        (scrollRef.current.scrollTop = scrollRef.current.scrollHeight);
      if (store.messageSent) {
        executeScroll();
        messageSentSwitcher();
      }
    }

    setUnreadMessagesFx({
      dialogId: store.currentDialog.id,
      userId: store.currentDialog.opponentId,
    }).then((data) => {
      scrollRef.current.scrollTop = scrollRef.current.scrollTop - 850;

      // пока что работает только на 10 сообщений
    });
  }, [
    onSendScrollRef,
    store.messageSent,
    store.currentDialog.id,
    store.currentDialog.opponentId,
  ]);

  const messages =
    store.currentDialogMessages && store.currentDialogMessages.length > 0 ? (
      store.currentDialogMessages.map((item: any, index: number) => {
        if (store.currentDialogMessages.length === index + 1) {
          return (
            <div ref={onSendScrollRef} key={Math.floor(Math.random() * 100000)}>
              <MessageItem
                isReaded={item.isReaded}
                date={item.date}
                text={item.data}
                mine={item.creater === sessionStorage["id"] ? true : false}
              />
            </div>
          );
        }
        return (
          <MessageItem
            isReaded={item.isReaded}
            date={item.date}
            text={item.data}
            mine={item.creater === sessionStorage["id"] ? true : false}
            key={item._id}
          />
        );
      })
    ) : (
      <div className="empty__dialog empty__dialog-modified">
        <img src={svg} alt="hand" />
        <h2>Send me a message! :)</h2>
      </div>
    );

  return (
    <div
      className="content__messages"
      ref={scrollRef}
      onScroll={() => {
        return onScrollLoaderMessages({
          ref: scrollRef,
          dialogId: store.currentDialog.id,
          page: store.currentDialog.page,
          unreadedPage: store.currentDialog.unreadedPage,
          myId: sessionStorage["id"],
          userId: store.currentDialog.opponentId,
        });
      }}
    >
      {messages}
    </div>
  );
};

export default Messages;
