import React, { useEffect } from "react";
import classnames from "classnames";
import {
  HomeStore,
  initialiseDialogFx
} from "../../../Home.model";
import { useStore } from "effector-react";

interface DialogItemTypes {
  avatar: string;
  id: string;
  fullName: string;
  isOnline: boolean;
}

export const DialogItem = ({
  avatar,
  id,
  fullName,
  isOnline,
}: DialogItemTypes) => {
  const store = useStore(HomeStore);
  useEffect(() => {
    // if(store.lastMessage.length < 1) setLastMessage(props.id);
  });

  const str = "hi brother what are you doing?";
  return (
    <div
      className="dialog__item"
      onClick={() => initialiseDialogFx({
          userId: id,
          myId: sessionStorage["id"],
          page: store.currentDialog.page
        })}>
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
          <span className="dialog__item-time">Now</span>
        </div>
        <div className="dialog__item-footer">
          <span className="dialog__item-text">
            {str.length > 10 ? str.substr(0, 9) + "..." : str}
          </span>
          <span className="dialog__item-unreaded">3</span>
        </div>
      </div>
    </div>
  );
};
