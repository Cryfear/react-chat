import React from "react";
import "./DialogItem.scss";
import classnames from "classnames";

interface DialogItemClassicProps {
  avatar: string;
  username: string;
  isOnline: boolean;
}

const DialogItemClassic = (props: DialogItemClassicProps) => {
  return (
    <div className="guyItem">
      <div
        className={classnames("guyItem__avatar", props.isOnline ? " guyItem__avatar-online" : "")}
      >
        <img className="guyItem__avatar-img" src={props.avatar} alt="user-avatar" />
      </div>
      <div className="guyItem__info-wrapper">
        <div style={{ textAlign: "left" }} className="guyItem__name-date">
          <div className="guyItem__name">{props.username}</div>
        </div>
        <div className="guyItem__text-unreadedCount">
          <div className="guyItem__text">Нажмите, для начала диалога.</div>
        </div>
      </div>
    </div>
  );
};

export default DialogItemClassic;
