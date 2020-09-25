import React from "react";
import "./TypingMessage.scss";

const TypingMessage = () => {
  return (
    <div className="Typing">
      <div className="content">
        <div className="loading-dots">
          <div className="loading-dots__dot"></div>
          <div className="loading-dots__dot"></div>
          <div className="loading-dots__dot"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingMessage;
