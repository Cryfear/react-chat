import classnames from "classnames";
import { ReadedCheckComponent } from "../ReadedCheckComponent/ReadedCheckComponent";
import { dateFormatter } from "@utils/dateFormatter";
import { useUnit } from "effector-react";
import { $HomeStore } from "@stores/Home.model";
import {$LoginStore} from "@stores/Login.model";

export const MessageItem = ({
  mine,
  data,
  date,
  isReaded,
}
  : {
    mine: boolean,
    data: string,
    date: string,
    isReaded: boolean,
  }) => {
  const store = useUnit($HomeStore);
  const authStore = useUnit($LoginStore);

  const avatar = mine ? authStore.myUserData.avatar : store.currentUser?.avatar;

  return (
    <div className={classnames("message", !mine ? "message-reverse" : "")}>
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
