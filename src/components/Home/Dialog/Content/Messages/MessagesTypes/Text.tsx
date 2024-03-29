import React from "react";
import classnames from "classnames";
import { ReadedCheckComponent } from "../ReadedCheckComponent/ReadedCheckComponent";
import { dateFormatter } from "../../../../../../utils/dateFormatter";
import { useStore } from "effector-react";
import { HomeStore } from "../../../../Home.model";
import { isAuthData } from "../../../../../../App.model";

interface MessageItemTypes {
  mine: boolean; // мое ли сообщение
  data: string; // message text
  date: Date; // дата создания
  isReaded: boolean; // прочитано ли
}

export const MessageItem = ({
  mine,
  data,
  date,
  isReaded,
}: MessageItemTypes) => {
  const store = useStore(HomeStore);
  const authStore = useStore(isAuthData);

  const avatar = + mine ? authStore.myUserData.avatar : store.currentUser?.avatar;

  return (
    <div className={classnames("message", !mine ? "message-reverse" : "")}>
      <div className="message__avatar">
        <img
          className="message__avatar-photo"
          //src={}
          src={avatar}
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
