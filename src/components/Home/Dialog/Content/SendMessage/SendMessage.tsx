import React from "react";
import "./SendMessage.scss";
import smile from "@assets/smile-send.png";
import photo from "@assets/send-photo.png";
import send from "@assets/send-message.png";
import TextareaAutosize from "react-textarea-autosize";
import { useUnit } from "effector-react";
import { sendMessageFx } from "@stores/Content.model";
import { $myUserData } from "@stores/Login.model";
import { VoiceMessage } from "../Messages/MessagesTypes/Voice/VoiceMessage";
import { $currentDialog, $currentUser } from "@/store/home";
import { getSocket } from "@/socket";

interface SendMessageProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onToggleEmojiPicker: () => void;
}

export const SendMessage = ({ inputValue, setInputValue, onToggleEmojiPicker }: SendMessageProps) => {
  const { currentUser, myUserData, currentDialog } = useUnit({
    currentUser: $currentUser,
    myUserData: $myUserData,
    currentDialog: $currentDialog,
  });

  const TextAreaKeyDownFunction = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      e.preventDefault();
      if (currentUser) {
        sendMessageFx({
          myId: myUserData.id,
          data: inputValue,
          userId: currentUser.id,
          dialogId: currentDialog.id,
        });

        setInputValue("");
      }
    }
  };

  let typingTimeout: NodeJS.Timeout | null = null;

  const handleTyping = () => {
    if (!currentUser) return;
    const socket = getSocket();
    socket.emit("typing:start", { dialogId: currentDialog.id });

    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("typing:stop", { dialogId: currentDialog.id });
    }, 3000);
  };

  const SendButtonFunction = () => {
    if (!currentUser) {
      return;
    }

    sendMessageFx({
      myId: myUserData.id,
      data: inputValue,
      userId: currentUser.id,
      dialogId: currentDialog.id,
    });
    setInputValue("");
  };

  return (
    <form className="send-form">
      <div className="send-form-relative">
        <span className="send-form__stickers" onClick={onToggleEmojiPicker}>
          <img src={smile} alt="smile icon" />
        </span>
        <div className="send-form__input-wrapper">
          <TextareaAutosize
            name="messagesender"
            maxRows={4}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              handleTyping();
            }}
            placeholder="Enter message text"
            className="send-form__input"
            onKeyDown={TextAreaKeyDownFunction}
          />
        </div>
        <span className="send-form__photo">
          <img src={photo} alt="phoo icon" />
        </span>
        <VoiceMessage />
        <button onClick={SendButtonFunction} type="button" className="send-form__submit">
          <img src={send} alt="send icon" />
        </button>
      </div>
    </form>
  );
};
