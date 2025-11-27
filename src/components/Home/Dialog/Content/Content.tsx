import React, { useState } from "react";
import { MessagesContainer } from "./Messages/MessagesContainer";
import { SendMessage } from "./SendMessage/SendMessage";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import "./Content.scss";

// import arrowDown from "../../../../assets/down-arrow.png";

export const Content = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInputValue((prev) => prev + emojiData.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  return (
    <div className="content">
      <MessagesContainer setShowEmojiPicker={setShowEmojiPicker}/>
      {/* <div className="content__arrow-to-bottom">
        <img src={arrowDown} alt="arr" />
        <span>99+</span>
      </div> */}
      {showEmojiPicker && (
        <div className="emoji-picker-container">
          <EmojiPicker onEmojiClick={handleEmojiClick} className="emoji-picker" />
        </div>
      )}
      
      <SendMessage
        inputValue={inputValue}
        setInputValue={setInputValue}
        onToggleEmojiPicker={toggleEmojiPicker}
        showEmojiPicker={showEmojiPicker}
      />
    </div>
  );
};
