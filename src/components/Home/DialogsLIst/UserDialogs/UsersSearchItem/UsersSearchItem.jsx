import React from "react";
import classnames from "classnames";
import { readyToCreateDialogFx } from "../../DialogsList.model";

export const UsersSearchItem = ({
  avatar,
  fullName,
  isOnline,
  id
}) => {
  return (
    <div className="dialog__item" onClick={() => readyToCreateDialogFx({user: {avatar, fullName, isOnline, id}, myId: sessionStorage['id']})}>
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
          <span className="dialog__item-name">{fullName.length < 12 ? fullName : fullName.substr(0, 11) + '...'}</span>
        </div>
      </div>
    </div>
  );
};
