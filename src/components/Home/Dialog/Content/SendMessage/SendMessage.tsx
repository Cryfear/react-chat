import React from "react";
import "./SendMessage.scss";
import smile from "../../../../../assets/smile-send.png";
import photo from "../../../../../assets/send-photo.png";
import voice from "../../../../../assets/mic.png";
import send from "../../../../../assets/send-message.png";
import TextareaAutosize from "react-textarea-autosize";
import { useUnit } from "effector-react";
import { $HomeStore } from "../../../Home.model";
import { sendMessageFx } from "../Content.model";
import { $LoginStore } from "../../../../Auth/Login/Login.model";

interface SendMessageProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onToggleEmojiPicker: () => void;
  showEmojiPicker: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  audioURL: any;
  isRecording: boolean;
}

export const SendMessage = ({
  inputValue,
  setInputValue,
  onToggleEmojiPicker,
  startRecording,
  stopRecording,
  audioURL,
  isRecording,
}: SendMessageProps) => {
  const { homeStore, authStore } = useUnit({
    homeStore: $HomeStore,
    authStore: $LoginStore,
  });

  const TextAreaKeyDownFunction = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      e.preventDefault();
      if (homeStore.currentUser) {
        sendMessageFx({
          myId: authStore.myUserData.id,
          data: inputValue,
          userId: homeStore.currentUser.id,
        });

        setInputValue("");
      }
    }
  };

  const SendButtonFunction = () => {
    if (!homeStore.currentUser) {
      return;
    }

    sendMessageFx({
      myId: authStore.myUserData.id,
      data: inputValue,
      userId: homeStore.currentUser.id,
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
        <span
          className="send-form__voice"
          onClick={() => {
            return isRecording ? stopRecording() : startRecording();
          }}
        >
          <img src={voice} alt="voice icon" />
        </span>
        <button onClick={SendButtonFunction} type="button" className="send-form__submit">
          <img src={send} alt="send icon" />
        </button>
      </div>
    </form>
  );
};
