import React from "react";
import classnames from "classnames";

interface UsersSearchItemTypes {
  avatar: string,
  id: string,
  fullName: string,
  isOnline: boolean
}

export const UsersSearchItem = ({avatar, fullName, isOnline}: UsersSearchItemTypes) => {
  return (
    <div className="dialog__item">
      <div
        className={classnames(
          "dialog__item-avatar", isOnline ? "dialog__item-online " : "dialog__item-offline"
        )}
      >
        <img
          src={avatar}
          alt="user-img"
        />
      </div>
      <div className="dialog__item-wrapper">
        <div className="dialog__item-header">
          <span className="dialog__item-name">{fullName}</span>
          <span className="dialog__item-time">Now</span>
        </div>
      </div>
    </div>
  );
};
