import React from "react";
import classnames from "classnames";
import { ReadedCheckComponent } from "../ReadedCheckComponent/ReadedCheckComponent";
import { dateFormatter } from "../../../../../../utils/dateFormatter";

interface MessageItemTypes {
  mine: boolean; // мое ли сообщение
  data: string; // message text
  date: Date;
  isReaded: boolean;
}

export const MessageItem = ({
  mine,
  data, // message text
  date,
  isReaded,
}: MessageItemTypes) => {

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
        <div className="message__text">{data}</div>
        <div className="message__date">{dateFormatter(date)}</div>
        <ReadedCheckComponent checked={isReaded} />
      </div>
    </div>
  );
};
