import { useStore } from "effector-react";
import React, { useRef } from "react";
import {
  HomeStore,
  onScrollLoaderMessages,
} from "../../../Home.model";

export const Messages = ({
  messages }: {
    messages: any
  }) => {
  const homeStore = useStore(HomeStore);
  const scrollRef: any = useRef<HTMLDivElement>(null);

  return (
    <div
      className="content__messages"
      ref={scrollRef}
      onScroll={() => {
        return onScrollLoaderMessages({
          ref: scrollRef,
          dialogId: homeStore.currentDialog.id,
          page: homeStore.currentDialog.page,
          myId: sessionStorage["id"],
          isDialogFullLoaded: homeStore.isDialogFullLoaded
        });
      }}
    >
      {messages}
    </div>
  );
};
