import { useEffect, useState } from "react";
import { MessagesContainer } from "./Messages/MessagesContainer";
import { SendMessage } from "./SendMessage/SendMessage";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import "./Content.scss";
import { messagesRead, readDialogFx } from "@/store/home";
import { getSocket } from "@/socket";

export const Content = ({ loading, dialogId, userId }: { loading: boolean; dialogId: string; userId: string | null }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInputValue((prev) => prev + emojiData.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  useEffect(() => {
    if (!dialogId || !userId) return;

    const socket = getSocket();
    socket.on("messages:read", ({ dialogId }) => {
      messagesRead({ dialogId });
    });

    readDialogFx({ dialogId, userId });
  }, [dialogId, userId]);

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
