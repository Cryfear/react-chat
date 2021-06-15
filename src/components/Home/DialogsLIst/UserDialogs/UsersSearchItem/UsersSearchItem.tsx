import React from "react";
import classnames from "classnames";

interface UsersSearchItemTypes {
  avatar: string,
  id: number, 
  name: string,
  isOnline: boolean
}

const UsersSearchItem = ({avatar, name, isOnline}: UsersSearchItemTypes) => {
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
      </div>
    </div>
  );
};

export default UsersSearchItem;
