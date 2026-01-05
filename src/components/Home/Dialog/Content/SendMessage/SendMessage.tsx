import React from "react";
import "./SendMessage.scss";
import smile from "@assets/smile-send.png";
import photo from "@assets/send-photo.png";
import send from "@assets/send-message.png";
import TextareaAutosize from "react-textarea-autosize";
import { useUnit } from "effector-react";
import { sendMessageFx } from "@stores/Content.model";
import { $LoginStore } from "@stores/Login.model";
import { VoiceMessage } from "../Messages/MessagesTypes/Voice/VoiceMessage";
import { $HomeStore } from "@/store/home";

interface SendMessageProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onToggleEmojiPicker: () => void;
}

export const SendMessage = ({ inputValue, setInputValue, onToggleEmojiPicker }: SendMessageProps) => {
  const { currentUser, myUserData } = useUnit({
    currentUser: $HomeStore.map((s) => s.currentUser),
    myUserData: $LoginStore.map((s) => s.myUserData),
  });

  const TextAreaKeyDownFunction = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      e.preventDefault();
      if (currentUser) {
        sendMessageFx({
          myId: myUserData.id,
          data: inputValue,
          userId: currentUser.id,
        });

        setInputValue("");
      }
    }
  };

  const SendButtonFunction = () => {
    if (!currentUser) {
      return;
    }

    sendMessageFx({
      myId: myUserData.id,
      data: inputValue,
      userId: currentUser.id,
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
            onChange={(e) => setInputValue(e.target.value)}
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
