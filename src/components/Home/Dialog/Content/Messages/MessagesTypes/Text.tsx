import React from "react";
import classnames from "classnames";
import ReadedCheckComponent from "../ReadedCheckComponent";

interface MessageItemTypes {
  mine: boolean; // мое ли сообщение
  text: string;
}

export const MessageItem = ({ mine, text }: MessageItemTypes) => {
  return (
    <div className={classnames("message", !mine ? "message-reverse" : "")}>
      <div className="message__avatar">
        <img
          className="message__avatar-photo"
          src={
            "https://sun9-8.userapi.com/impg/CDsRtIMBb8z1Zj_ZUaR-cXsKynVsAa5vCr1egg/Vfaolg2sGXU.jpg?size=1080x1350&quality=96&sign=7a53fca993112073fda366beb7210151&type=album"
          }
          alt="avatar"
        />
      </div>
      <div className="message__content-wrapper">
        <div className="message__text">{text}</div>
        <div className="message__date">yesterday 6:32AM</div>
        <ReadedCheckComponent checked={false} />
      </div>
    </div>
  );
};
