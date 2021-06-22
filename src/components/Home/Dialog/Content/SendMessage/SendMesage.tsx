import React from "react";

export const SendMessage = () => {
  return (
    <div className="send-form">
      <span className="send-form__stickers"></span>
      <div placeholder="Enter message text" contentEditable="true" className="send-form__input"></div>
      <span className="send-form__photo"></span>
      <span className="send-form__voice"></span>
      <button className="send-form__submit"></button>
    </div>
  );
};
