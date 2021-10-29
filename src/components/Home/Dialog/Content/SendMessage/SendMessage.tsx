import React from "react";

import "./SendMessage.scss";
import smile from "../../../../../assets/smile-send.svg";
import photo from "../../../../../assets/send-photo.svg";
import voice from "../../../../../assets/mic.png";
import send from "../../../../../assets/send-message.svg";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useStore } from "effector-react";
import { HomeStore } from "../../../Home.model";
import { DialogsListStore } from "../../../DialogsLIst/DialogsList.model";
import { sendMessageFx } from "../Content.model";

export const SendMessage = () => {
  const [inputValue, setInputValue] = useState("");
  const store = useStore(HomeStore);
  const dialogsListStore = useStore(DialogsListStore);

  const TextAreaKeyDownFunction = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      e.preventDefault();
      store.currentDialog.id.length > 0 && inputValue.trim() !== ""
        ? sendMessageFx({
            dialogId: store.currentDialog.id,
            myId: sessionStorage["id"],
            data: inputValue,
          })
        : sendMessageFx({
            userId: dialogsListStore.potentialDialog?.id,
            myId: sessionStorage["id"],
            data: inputValue,
          });
      setInputValue("");
    }
  };

  const SendButtonFunction = () => {
    store.currentDialog.id && inputValue.trim() !== ""
      ? sendMessageFx({
          dialogId: store.currentDialog.id,
          myId: sessionStorage["id"],
          data: inputValue,
        })
      : sendMessageFx({
          userId: dialogsListStore.potentialDialog?.id,
          myId: sessionStorage["id"],
          data: inputValue,
        });
    setInputValue("");
  };

  return (
    <form className="send-form">
      <div className="send-form-relative">
        <span className="send-form__stickers">
          <img src={smile} alt="smile icon" />
        </span>
        <TextareaAutosize
          maxRows={4}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter message text"
          className="send-form__input"
          onKeyDown={TextAreaKeyDownFunction}
        />
        <span className="send-form__photo">
          <img src={photo} alt="phoo icon" />
        </span>
        <span className="send-form__voice">
          <img src={voice} alt="voice icon" />
        </span>
        <button
          onClick={SendButtonFunction}
          type="button"
          className="send-form__submit"
        >
          <img src={send} alt="send icon" />
        </button>
      </div>
    </form>
  );
};
