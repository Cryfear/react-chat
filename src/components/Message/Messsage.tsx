import React from "react";
import "./Message.scss";
import UnReadedSVG from "../AreReadedSVG/UnReadedSVG";
import ReadedSVG from "../AreReadedSVG/ReadedSVG";
import { dateFormatter } from "../../assets/dateFormatter";

interface MessageProps {
  date: number | Date;
  avatar: string;
  message_text: string;
  isMe?: boolean;
  isReaded?: boolean;
}

const Message = (props: MessageProps) => {
  return (
    <>
      <div className={props.isMe ? "myMessage" : "message"}>
        <div className={props.isMe ? "myMessage__wrapper" : "message__wrapper"}>
          <div className={props.isMe ? "myMessage__avatarWrapper" : "message__avatarWrapper"}>
            <img className="message__avatar" src={props.avatar} alt="user_img" />
          </div>
          <div className={props.isMe ? "myMessage__bubble" : "message__bubble"}>
            <div className="message__text">{props.message_text}</div>
          </div>
          {props.isMe && (
            <div className="myMessage__isReaded">
              {props.isReaded === true ? <ReadedSVG /> : <UnReadedSVG />}
            </div>
          )}
        </div>
        <div className={props.isMe ? "myMessage__date " : "message__date"}>
          {dateFormatter({ date: props.date })}
        </div>
      </div>
    </>
  );
};

export default Message;
