import React, { useRef } from "react";
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from "@ant-design/icons";
import { MessagesApi } from "../../../api/api";

const MessagesInputWrapper = props => {
  const input = useRef(null);
  return (
    <div className="messages__input-wrapper">
      <div className="input__stikers">
        <SmileOutlined style={{ fontSize: "17px" }} />
      </div>
      <div className="messages__input-text">
        <input ref={input} className="message_yeap" type="text" />
      </div>
      <div className="messages__photos">
        <CameraOutlined style={{ fontSize: "17px" }} />
      </div>
      <div className="messages__microphone">
        <AudioOutlined style={{ fontSize: "17px" }} />
      </div>
      <div
        onClick={() => {
          if (input && input.current) {
            window.input = input;
            return MessagesApi.createMessage(
              props.dialogId,
              sessionStorage["userId"],
              input.current.value
            ).then(data => {
              console.log(data);
              return data;
            });
          }
        }}
        className="messages__sendMessage"
      >
        <SendOutlined style={{ fontSize: "17px" }} />
      </div>
    </div>
  );
};

export default MessagesInputWrapper;
