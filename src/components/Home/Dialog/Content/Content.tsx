import { useState } from "react";
import { MessagesContainer } from "./Messages/MessagesContainer";
import { SendMessage } from "./SendMessage/SendMessage";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import "./Content.scss";

export const Content = ({ loading}: { loading: boolean;}) => {
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
      <MessagesContainer loading={loading} setShowEmojiPicker={setShowEmojiPicker} />

      {showEmojiPicker && (
        <div className="emoji-picker-container">
          <EmojiPicker onEmojiClick={handleEmojiClick} className="emoji-picker" />
        </div>
      )}

      <SendMessage inputValue={inputValue} setInputValue={setInputValue} onToggleEmojiPicker={toggleEmojiPicker} />
    </div>
  );
};
