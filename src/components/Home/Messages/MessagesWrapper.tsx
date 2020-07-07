import React from "react";
import Message from "../../Message/Message";

interface MessagesWrapperTypes {
  messages: Array<messageTypes>;
}

interface messageTypes {
  data: string;
  creater: string;
  length: number;
}

const MessagesWrapper = (props: MessagesWrapperTypes) => {
  // if (props.messages && props.messages.length > 0) {
  //   props.messages.map((item, index) => {
  //     return (
  //       <Message
  //         key={index}
  //         date={new Date()}
  //         avatar={"https://sun9-47.userapi.com/c857520/v857520118/13765d/yWNm9_uF_XM.jpg"}
  //         message_text={item.data}
  //         isMe={item.creater === sessionStorage["userId"] ? true : false}
  //       />
  //     );
  //   });
  // }
  return <div>wtf??</div>;
};

export default MessagesWrapper;
