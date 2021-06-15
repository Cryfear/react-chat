import React from "react";
import classnames from "classnames";

interface DialogItemTypes {
  avatar: string,
  id: number, 
  name: string,
  isOnline: boolean
}

const DialogItem = ({avatar, id, name, isOnline}: DialogItemTypes) => {
  const str = "hi brother what are you doing?";
  return (
    <div className="dialog__item">
      <div
        className={classnames("dialog__item-avatar", isOnline ? "dialog__item-online " : "dialog__item-offline")}
      >
        <img
          src={avatar}
          alt="user-img"
        />
      </div>
      <div className="dialog__item-wrapper">
        <div className="dialog__item-header">
          <span className="dialog__item-name">{name}</span>
          <span className="dialog__item-time">Now</span>
        </div>
        <div className="dialog__item-footer">
          <span className="dialog__item-text">{str.length > 25 ? str.substr(0, 20) + "..." : str}</span>
          <span className="dialog__item-unreaded">3</span>
        </div>
      </div>
    </div>
  );
};

export default DialogItem;
