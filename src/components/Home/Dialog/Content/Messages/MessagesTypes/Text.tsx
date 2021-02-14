import React from "react";

const MessagesItem = () => {
  const isYour = true;
  const isChecked = false;
  return (
    <div className="message">
      <img src="" alt="" />
      <div className="message__content-wrapper">
        <div className="message__text">How are you Dan</div>
        <div className="message__date">yesterday 6:32AM</div>
      </div>
    </div>
  );
};

export default MessagesItem;
