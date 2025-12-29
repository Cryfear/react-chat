import classnames from "classnames";
import { useUnit } from "effector-react";
import { Link } from "react-router-dom";
import { $HomeStore, initialiseDialogFx } from "@/store/Home.model";
import React from "react";

const DialogItem = ({
  avatar,
  _id,
  fullName,
  isOnline,
  lastMessageDate,
  lastMessage,
  unreadCount,
}: {
  avatar: string | undefined;
  fullName: string | undefined;
  unreadCount: number;
  lastMessageDate: string;
  lastMessage: string;
  _id: string | undefined;
  isOnline: boolean | undefined;
}) => {
  const { currentDialog } = useUnit($HomeStore);

  const userName = fullName ? fullName.length > 9 ? fullName.slice(0, 9) + "..." : fullName: 'Loading...';
  const convertedLastMessage = lastMessage && lastMessage.length > 10 ? lastMessage.substr(0, 9) + "..." : lastMessage;
  const date = new Date(lastMessageDate);

  return (
    <Link className="dialog__item__wrapper" to={`/dialogs/${_id}`}>
      <div
        className="dialog__item"
        onClick={() => {
          initialiseDialogFx({
            userId: _id,
            myId: sessionStorage["id"],
            page: currentDialog.page,
          });
        }}
      >
        <div className={classnames("dialog__item-avatar", isOnline ? "dialog__item-online " : "dialog__item-offline")}>
          <img src={"http://localhost:8888/" + avatar} alt="user-img" />
        </div>
        <div className="dialog__item-wrapper">
          <div className="dialog__item-header">
            <span className="dialog__item-name">{userName}</span>
            <span className="dialog__item-time">{date.toLocaleDateString()}</span>
          </div>
          <div className="dialog__item-footer">
            <span className="dialog__item-text">{convertedLastMessage}</span>
            {unreadCount === 0 ? "" : <span className={"dialog__item-unreaded"}>{unreadCount}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export const MemoDialogItem = React.memo(DialogItem);
