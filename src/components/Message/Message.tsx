import React from "react";
import "./Message.scss";
import UnReadedSVG from "../AreReadedSVG/UnReadedSVG";
import ReadedSVG from "../AreReadedSVG/ReadedSVG";
import { dateFormatter } from "../../assets/dateFormatter";
import TypingMessage from "../TypingMessage/TypingMessage";
import AudioMessage from "../AudioMessage/AudioMessage";

interface MessageProps {
  date: number | Date;
  avatar: string;
  message_text: string;
  isMe?: boolean;
  isReaded?: boolean;
  isTyping?: boolean;
  audio?: boolean;
}

const Message = ({ isTyping, isReaded, isMe, message_text, avatar, date, audio }: MessageProps) => {
  const classes = {
    message: ["message", "myMessage"],
    messageWrapper: ["message__wrapper", "myMessage__wrapper"],
    avatarWrapper: ["message__avatarWrapper", "myMessage__avatarWrapper"],
    messageBubble: ["message__bubble", "myMessage__bubble"],
  };

  const flag = isMe && !isTyping ? 1 : 0;

  return (
    <>
      <div className={classes.message[flag]}>
        <div className={classes.messageWrapper[flag]}>
          <div className={classes.avatarWrapper[flag]}>
            <img className="message__avatar" src={avatar} alt="user_img" />
          </div>
          {isTyping ? (
            <TypingMessage />
          ) : (
            <div className={classes.messageBubble[flag]}>
              {audio ? (
                <AudioMessage isMe={false} />
              ) : (
                <div className="message__text">{message_text}</div>
              )}
            </div>
          )}

          {flag && (
            <div className="myMessage__isReaded">{isReaded ? <ReadedSVG /> : <UnReadedSVG />}</div>
          )}
        </div>
        {!isTyping ? (
          <div className={isMe ? "myMessage__date " : "message__date"}>
            {dateFormatter({ date: date })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Message;
