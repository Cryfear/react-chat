import React from "react";
import classnames from "classnames";
import ReadedCheckComponent from "../ReadedCheckComponent";

interface MessageItemTypes {
  mine: boolean; // мое ли сообщение
}

const MessagesItem = ({ mine }: MessageItemTypes) => {
  return (
    <div className={classnames("message", mine ? "message-reverse" : "")}>
      <div className="message__avatar">
        <img
          className="message__avatar-photo"
          src={
            "https://sun9-35.userapi.com/impg/ZbyN_wWEp2bZa5uCf_aiAZaNNl3E1OIJh8xBVQ/eIfg4vRvhmo.jpg?size=1080x1080&quality=96&proxy=1&sign=608cbb6b6c7f5b789de94557d940251b&type=album"
          }
          alt="avatar"
        />
      </div>
      <div className="message__content-wrapper">
        <div className="message__text">How are you Dan?</div>
        <div className="message__date">yesterday 6:32AM</div>
        <ReadedCheckComponent checked={false} />
      </div>
    </div>
  );
};

export default MessagesItem;
