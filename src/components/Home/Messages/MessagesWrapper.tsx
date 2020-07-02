import React from "react";
import Message from "../../Message/Message";

const MessagesWrapper = () => {
  return (
    <div className="messages__wrapper">
      <Message
        date={new Date(2020, 4, 27, 16)}
        avatar="https://sun9-47.userapi.com/c857520/v857520118/13765d/yWNm9_uF_XM.jpg"
        message_text="Салам, Брут! Чё, как, уничтожил флот галлов? 🖐🏻"
      />
      <Message
        date={new Date(new Date(2020, 4, 30, 2))}
        avatar="https://sun9-61.userapi.com/c856016/v856016589/150055/pMbRBQCR-o0.jpg"
        message_text="Мы тут недавно войска Ариовиста разбили, чуваки хотели закрепиться на галльских землях, лол 🌝"
        isMe={true}
        audio={true}
      />
      <Message
        date={new Date(new Date(2020, 4, 27))}
        avatar="https://sun9-61.userapi.com/c856016/v856016589/150055/pMbRBQCR-o0.jpg"
        message_text="Мы тут недавно войска Ариовиста разбили, чуваки хотели закрепиться на галльских землях, лол 🌝"
        isMe={true}
        isReaded={true}
      />
    </div>
  );
};

export default MessagesWrapper;
