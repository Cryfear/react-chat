import React from "react";
import Message from "../../Message/Message";
import { MessagesWrapperTypes } from "../HomeTypes";

const MessagesWrapper = (props: MessagesWrapperTypes) => {
  let messages: any;
  if (props.messages) {
    messages = props.messages.map((item, index) => {
      return (
        <Message
          key={index}
          date={new Date()}
          avatar={"https://sun9-47.userapi.com/c857520/v857520118/13765d/yWNm9_uF_XM.jpg"}
          message_text={item.data}
          isMe={item.creater === props.myId ? true : false}
        />
      );
    });
  }

  return messages || <div></div>;
};

export default MessagesWrapper;
