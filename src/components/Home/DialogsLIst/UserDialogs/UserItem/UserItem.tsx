import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { readyToCreateDialogFx } from "@/store/home";

const UsersSearchItem = ({
  avatar,
  fullName,
  isOnline,
  id,
}: {
  avatar: string;
  fullName: string;
  isOnline: boolean;
  id: string;
}) => {
  return (
    <Link className="dialog__item__wrapper" to={`/dialogs/${id}`}>
      <div
        className="dialog__item"
        onClick={() => readyToCreateDialogFx({ user: { avatar, fullName, isOnline, id }, myId: sessionStorage["id"] })}
      >
        <div className={classnames("dialog__item-avatar", isOnline ? "dialog__item-online " : "dialog__item-offline")}>
          <img src={avatar} alt="user-img" />
        </div>
        <div className="dialog__item-wrapper">
          <div className="dialog__item-header">
            <span className="dialog__item-name">{fullName.length < 12 ? fullName : fullName.substr(0, 11) + "..."}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const MemoUserItem = React.memo(UsersSearchItem);
