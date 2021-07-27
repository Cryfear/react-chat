import React from "react";
import { MessageItem } from "./MessagesTypes/Text";

import "./MessagesTypes.scss";
import { useStore } from "effector-react";
import { HomeStore, onScrollLoaderMessages } from "../../../Home.model";

import svg from "../../../../../assets/waving-hand.svg";
import { useRef } from "react";

const Messages = () => {
  const store = useStore(HomeStore);
  const scrollRef: any = useRef(null);

  const messages =
    store.currentDialogMessages && store.currentDialogMessages.length > 0 ? (
      store.currentDialogMessages.map((item: any, index: any) => {
        return (
          <MessageItem
            date={item.date}
            text={item.data}
            mine={item.creater === sessionStorage["id"] ? true : false}
            key={index}
          />
        );
      })
    ) : (
      <div className="empty__dialog empty__dialog-modified">
        <img src={svg} alt="hand" />
        <h2>
          Send me a message! :)
        </h2>
      </div>
    );

  return (
    <div
      className="content__messages"
      ref={scrollRef}
      onScroll={(e: any) => {
        console.log(scrollRef)
        return onScrollLoaderMessages({
          ref: scrollRef,
          dialogId: store.currentDialog.id,
          page: store.currentDialog.page,
        });
      }}
    >
      {messages}
    </div>
  );
};

export default Messages;
