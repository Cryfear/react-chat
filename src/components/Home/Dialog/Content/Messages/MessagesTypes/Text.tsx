import React from "react";
import classnames from "classnames";
import { ReadedCheckComponent } from "../ReadedCheckComponent/ReadedCheckComponent";
import { dateFormatter } from "../../../../../../utils/dateFormatter";
import { useStore } from "effector-react";
import { HomeStore } from "../../../../Home.model";
import {$LoginStore} from "../../../../../Auth/Login/Login.model";

export const MessageItem = ({
  mine,
  data,
  date,
  isReaded,
  key
}
  : {
    mine: boolean,
    data: string,
    date: string,
    isReaded: boolean,
    key: string
  }) => {
  const store = useStore(HomeStore);
  const authStore = useStore($LoginStore);

  const avatar = + mine ? authStore.myUserData.avatar : store.currentUser?.avatar;

  return (
    <div key={key} className={classnames("message", !mine ? "message-reverse" : "")}>
      <div className="message__avatar">
        <img
          className="message__avatar-photo"
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
