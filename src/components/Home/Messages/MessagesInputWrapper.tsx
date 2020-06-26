import React from "react";
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from "@ant-design/icons";

const MessagesInputWrapper = () => {
  return (
    <div className="messages__input-wrapper">
      <div className="input__stikers">
        <SmileOutlined style={{ fontSize: "17px" }} />
      </div>
      <div className="messages__input-text">
        <input className="message_yeap" type="text" />
      </div>
      <div className="messages__photos">
        <CameraOutlined style={{ fontSize: "17px" }} />
      </div>
      <div className="messages__microphone">
        <AudioOutlined style={{ fontSize: "17px" }} />
      </div>
      <div className="messages__sendMessage">
        <SendOutlined style={{ fontSize: "17px" }} />
      </div>
    </div>
  );
};

export default MessagesInputWrapper;
