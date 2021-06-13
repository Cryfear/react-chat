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
          src="https://sun9-8.userapi.com/impg/CDsRtIMBb8z1Zj_ZUaR-cXsKynVsAa5vCr1egg/Vfaolg2sGXU.jpg?size=1080x1350&quality=96&sign=7a53fca993112073fda366beb7210151&type=album"
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
