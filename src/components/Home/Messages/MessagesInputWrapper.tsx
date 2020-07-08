import React, { useRef } from "react";
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from "@ant-design/icons";
import { MessagesInputWrapperTypes } from "../HomeTypes";

const MessagesInputWrapper = (props: MessagesInputWrapperTypes) => {
  const input: any = useRef(null);
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
          props.createMessage(props.dialogId, props.myId, input.current.value);
        }}
        className="messages__sendMessage"
      >
        <SendOutlined style={{ fontSize: "17px" }} />
      </div>
    </div>
  );
};

export default MessagesInputWrapper;
