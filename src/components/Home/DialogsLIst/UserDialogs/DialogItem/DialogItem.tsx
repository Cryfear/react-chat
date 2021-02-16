import React from "react";
import classnames from "classnames";

import "./DialogItem.scss";

const DialogItem = () => {
  const str = "hi brother what are you doing?";
  return (
    <div className="dialog__item">
      <div
        className={classnames("dialog__item-avatar", true ? "dialog__item-online " : "dialog__item-offline")}
      >
        <img
          src="https://sun9-35.userapi.com/impg/ZbyN_wWEp2bZa5uCf_aiAZaNNl3E1OIJh8xBVQ/eIfg4vRvhmo.jpg?size=1080x1080&quality=96&proxy=1&sign=608cbb6b6c7f5b789de94557d940251b&type=album"
          alt="user-img"
        />
      </div>
      <div className="dialog__item-wrapper">
        <div className="dialog__item-header">
          <span className="dialog__item-name">Name</span>
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
