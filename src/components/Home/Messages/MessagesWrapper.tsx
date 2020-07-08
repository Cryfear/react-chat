import React from "react";
import Message from "../../Message/Message";
import { MessagesWrapperTypes } from "../HomeTypes";

const MessagesWrapper = (props: MessagesWrapperTypes) => {
  let messages: any;
  if (props.messages) {
    messages = props.messages.map((item: any, index) => {
      console.log(item);
      return (
        <Message
          key={index}
          date={new Date()}
          avatar={props.avatar}
          message_text={item.data}
          isMe={item.creater === props.myId ? true : false}
        />
      );
    });
  }

  return messages || <div></div>;
};

export default MessagesWrapper;
