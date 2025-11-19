import React from "react";
import "./SendMessage.scss";
import smile from "../../../../../assets/smile-send.png";
import photo from "../../../../../assets/send-photo.png";
import voice from "../../../../../assets/mic.png";
import send from "../../../../../assets/send-message.png";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { useUnit } from "effector-react";
import { $HomeStore } from "../../../Home.model";
import { $DialogsListStore } from "../../../DialogsLIst/DialogsList.model";
import { sendMessageFx } from "../Content.model";
import { $LoginStore } from "../../../../Auth/Login/Login.model";

export const SendMessage = () => {
  const [inputValue, setInputValue] = useState("");

  const { homeStore, authStore, dialogsListStore } = useUnit({
    homeStore: $HomeStore,
    authStore: $LoginStore,
    dialogsListStore: $DialogsListStore,
  });

  const TextAreaKeyDownFunction = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      e.preventDefault();
      if (homeStore.currentUser) {
        sendMessageFx({
          dialogId: homeStore.currentDialog.id,
          myId: authStore.myUserData.id,
          data: inputValue,
          userId: homeStore.currentUser.id,
        });

        setInputValue("");
      }
    }
  };

  const SendButtonFunction = () => {
    homeStore.currentDialog.id && inputValue.trim() !== ""
      ? sendMessageFx({
          dialogId: homeStore.currentUser,
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
          {/* <div className="send-form__input" 
          contentEditable="true" 
          onKeyDown={TextAreaKeyDownFunction} 
          onChange={(e) => setInputValue(e.target.value)}>
          </div> */}
        </div>
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
