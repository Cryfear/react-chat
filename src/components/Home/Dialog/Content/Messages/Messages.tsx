import { useStore } from "effector-react";
import React from "react";
import {
  HomeStore,
  onScrollLoaderMessages,
} from "../../../Home.model";
import { MessageType } from "../../../../../hooks/useCreatingMessagesList";

export const Messages = ({
  messages, //: React.ReactElement<MessageType>,
  scrollRef }: {
    scrollRef: any,
    messages: any
  }) => {
  const homeStore = useStore(HomeStore);

  return (
    <div
      className="content__messages"
      ref={scrollRef}
      onScroll={() => {
        return onScrollLoaderMessages({
          ref: scrollRef,
          dialogId: homeStore.currentDialog.id,
          page: homeStore.currentDialog.page,
          unreadedPage: homeStore.currentDialog.unreadedPage,
          myId: sessionStorage["id"],
          userId: homeStore.currentDialog.opponentId,
        });
      }}
    >
      {messages}
    </div>
  );
};
