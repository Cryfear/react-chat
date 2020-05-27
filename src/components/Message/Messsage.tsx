import React from "react";
import "./Message.scss";
import UnReadedSVG from "../AreReadedSVG/UnReadedSVG";
import ReadedSVG from "../AreReadedSVG/ReadedSVG";
import { dateFormatter } from "../../assets/dateFormatter";
import TypingMessage from "../TypingMessage/TypingMessage";

interface MessageProps {
  date: number | Date;
  avatar: string;
  message_text: string;
  isMe?: boolean;
  isReaded?: boolean;
  isTyping?: boolean;
}

const Message = (props: MessageProps) => {
  return (
    <>
      <div className={props.isMe && !props.isTyping ? "myMessage" : "message"}>
        <div className={props.isMe && !props.isTyping ? "myMessage__wrapper" : "message__wrapper"}>
          <div
            className={
              props.isMe && !props.isTyping ? "myMessage__avatarWrapper" : "message__avatarWrapper"
            }
          >
            <img className="message__avatar" src={props.avatar} alt="user_img" />
          </div>
          {props.isTyping ? (
            <TypingMessage />
          ) : (
            <div
              className={props.isMe && !props.isTyping ? "myMessage__bubble" : "message__bubble"}
            >
              <div className="message__text">{props.message_text}</div>
            </div>
          )}

          {props.isMe && !props.isTyping && (
            <div className="myMessage__isReaded">
              {props.isReaded === true ? <ReadedSVG /> : <UnReadedSVG />}
            </div>
          )}
        </div>
        {!props.isTyping ? (
          <div className={props.isMe ? "myMessage__date " : "message__date"}>
            {dateFormatter({ date: props.date })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Message;
