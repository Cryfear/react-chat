import React, { useEffect } from "react";
import classnames from "classnames";
import { HomeStore, initialiseDialogFx } from "../../../Home.model";
import { useStore } from "effector-react";
import { useState } from "react";
import {
  getLastDialogMessage,
  getUnreadedMessagesCount,
} from "../../DialogsList.model";
import { LastMessageDateFormatter } from "../../../../../utils/dateFormatter";

interface DialogItemTypes {
  avatar: string;
  id: string; // opponent user id
  dialogId: string;
  fullName: string;
  isOnline: boolean;
}

export const DialogItem = ({
  avatar,
  dialogId,
  id,
  fullName,
  isOnline,
}: DialogItemTypes) => {
  const store = useStore(HomeStore);
  const [lastMessage, setLastMessage] = useState("");
  const [lastMessageDate, setLastMessageDate] = useState("");
  const [unreadCount, setUnreadCount] = useState(undefined);

  useEffect(() => {
    let isMounted = true;

    if (lastMessage === "")
      getLastDialogMessage(dialogId).then((data) => {
        if (isMounted) {
          setLastMessage(data ? data.text : "");
          setLastMessageDate(LastMessageDateFormatter(data ? data.date : ""));
        }
      });

    if (unreadCount === undefined) {
      getUnreadedMessagesCount({ dialogId, userId: id }).then((data) => {
        if (isMounted) {
          setUnreadCount(data);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [setLastMessage, lastMessage, dialogId, setUnreadCount, unreadCount, id]);

  return (
    <div
      className="dialog__item"
      onClick={() =>
        initialiseDialogFx({
          userId: id,
          myId: sessionStorage["id"],
          page: store.currentDialog.page,
        })
      }
    >
      <div
        className={classnames(
          "dialog__item-avatar",
          isOnline ? "dialog__item-online " : "dialog__item-offline"
        )}
      >
        <img src={avatar} alt="user-img" />
      </div>
      <div className="dialog__item-wrapper">
        <div className="dialog__item-header">
          <span className="dialog__item-name">{fullName}</span>
          <span className="dialog__item-time">{lastMessageDate}</span>
        </div>
        <div className="dialog__item-footer">
          <span className="dialog__item-text">
            {lastMessage && lastMessage.length > 10
              ? lastMessage.substr(0, 9) + "..."
              : lastMessage}
          </span>
          {unreadCount === 0 ? (
            ""
          ) : (
            <span className={"dialog__item-unreaded"}>{unreadCount}</span>
          )}
        </div>
      </div>
    </div>
  );
};
