import { useStore } from "effector-react";
import React from "react";
import {
  HomeStore,
  MessageType,
  onScrollLoaderMessages,
} from "../../../Home.model";

export const Messages = ({
  messages,
  scrollRef,
}: {
  messages: MessageType[];
  scrollRef: React.RefObject<HTMLDivElement>;
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
