import classnames from "classnames";
import { ReadedCheckComponent } from "../ReadedCheckComponent/ReadedCheckComponent";
import { dateFormatter } from "@utils/dateFormatter";
import { useUnit } from "effector-react";
import { $HomeStore } from "@stores/Home.model";
import { $LoginStore } from "@stores/Login.model";
import Voice from "./Voice/Voice";
import React from "react";

export const MessageItem = ({
  mine,
  data,
  date,
  isReaded,
  type,
  id,
}: {
  mine: boolean;
  id: string;
  data: string;
  date: string;
  isReaded: boolean;
  type: string;
}) => {
  const { currentUser } = useUnit($HomeStore);
  const { myUserData } = useUnit($LoginStore);

  const avatar = mine ? myUserData.avatar : currentUser?.avatar;

  if (type && type[0] === "audio") return <Voice url={"http://localhost:8888" + data} key={id} isReaded />;

  return (
    <div className={classnames("message", !mine ? "message-reverse" : "")}>
      <div className="message__avatar">
        <img className="message__avatar-photo" src={avatar || 'null'} alt="avatar" />
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
