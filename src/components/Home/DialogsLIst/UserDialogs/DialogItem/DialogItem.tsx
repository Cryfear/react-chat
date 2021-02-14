import React from "react";

const DialogItem = () => {
  return (
    <div className="dialogs__item">
      <img src="" alt="" />
      <div className="dialog__item-wrapper">
        <div className="dialog__item-header">
          <span className="dialog__item-name">Name</span>
          <span className="dialog__item-time">Now</span>
        </div>
        <div className="dialog__item-footer">
          <span className="dialog__item-text">hi brother what are you doing?</span>
          <span className="dialog__item-unreaded">3</span>
        </div>
      </div>
    </div>
  );
};

export default DialogItem;
