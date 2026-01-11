import classnames from "classnames";
import { ReadedCheckComponent } from "../ReadedCheckComponent/ReadedCheckComponent";
import { dateFormatter } from "@utils/dateFormatter";
import Voice from "./Voice/Voice";
import React from "react";

export type IUser = {
  id: string;
  avatar: string;
  name: string;
  isOnline: boolean;
};

export const MessageItem = ({
  mine,
  data,
  date,
  isReaded,
  type,
  avatar,
}: {
  mine: boolean;
  avatar: string;
  data: string;
  date: string;
  isReaded: boolean;
  type: string;
}) => {
  if (type && type[0] === "audio") return <Voice url={"http://localhost:8888" + data} isReaded />;

  return (
    <div className={classnames("message", !mine ? "message-reverse" : "")}>
      <div className="message__avatar">
        <img className="message__avatar-photo" src={avatar || "null"} alt="avatar" />
      </div>
      <div className="message__content-wrapper">
        <div className="message__text">{data}</div>
        <div className="message__date">{dateFormatter(date)}</div>
        <ReadedCheckComponent checked={isReaded} />
      </div>
    </div>
  );
};

export const MemoMessageItem = React.memo(MessageItem);
