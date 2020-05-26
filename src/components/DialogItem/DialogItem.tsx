import React from "react";
import "./DialogItem.scss";

interface DialogItemProps {
  avatar: string;
  username: string;
  date: object | Date | string;
  lastMessage: string;
  unreadedCount?: number;
}

const DialogItem = (props: DialogItemProps) => {
  return (
    <div className="guyItem">
      <div className="guyItem__avatar">
        <img className="guyItem__avatar-img" src={props.avatar} alt="user-avatar" />
      </div>
      <div className="guyItem__info-wrapper">
        <div className="guyItem__name-date">
          <div className="guyItem__name">{props.username}</div>
          <div className="guyItem__date">{props.date}</div>
        </div>
        <div className="guyItem__text-unreadedCount">
          <div className="guyItem__text">
            {props.lastMessage.length > 16 ? props.lastMessage + "..." : props.lastMessage}
          </div>
          <div className="guyItem__unreadedCount">
            <div className="guyItem__unreadedCount-span">{props.unreadedCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogItem;
