import React from "react";
import "./DialogItem.scss";
import classnames from "classnames";
import { dateFormatter } from "../../../../../assets/dateFormatter";

interface DialogItemProps {
  avatar: string;
  username: string;
  date: number | Date;
  lastMessage: string;
  unreadedCount: number;
  isOnline: boolean;
}

const DialogItem = (props: DialogItemProps) => {
  return (
    <div className="guyItem">
      <div
        className={classnames("guyItem__avatar", props.isOnline ? " guyItem__avatar-online" : "")}
      >
        <img className="guyItem__avatar-img" src={props.avatar} alt="user-avatar" />
      </div>
      <div className="guyItem__info-wrapper">
        <div className="guyItem__name-date">
          <div className="guyItem__name">{props.username}</div>
          <div className="guyItem__date">{dateFormatter({ date: props.date })}</div>
        </div>
        <div className="guyItem__text-unreadedCount">
          <div className="guyItem__text">
            {props.lastMessage.length > 24
              ? props.lastMessage.slice(0, 24) + "..."
              : props.lastMessage}
          </div>
          <div className="guyItem__unreadedCount">
            <div className="guyItem__unreadedCount-span">
              {props.unreadedCount > 10 ? "9+" : props.unreadedCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogItem;
