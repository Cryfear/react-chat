import React from "react";

interface DialogItemProps {}

const DialogItem = (props: DialogItemProps) => {
  return (
    <div className="guyItem">
      <div className="guyItem__avatar"></div>
      <div className="guyItem__info-wrapper">
        <div className="guyItem__name-date">
          <div className="guyItem__name">Jack the Ripper</div>
          <div className="guyItem__date">Сейчас</div>
        </div>
        <div className="guyItem__text-unreadedCount">
          <div className="guyItem__text">Привет ты как там?</div>
          <div className="guyItem__unreadedCount">5</div>
        </div>
      </div>
    </div>
  );
};

export default DialogItem;
