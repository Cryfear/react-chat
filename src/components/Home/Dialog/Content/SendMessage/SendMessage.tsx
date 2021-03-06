import React from "react";

import "./SendMessage.scss";
import smile from "../../../../../assets/smile-send.svg";
import photo from "../../../../../assets/send-photo.svg";
import voice from "../../../../../assets/mic.png";
import send from "../../../../../assets/send-message.svg";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useStore } from "effector-react";
import {
  HomeStore,
  sendMessageFx,
} from "../../../Home.model";
import {
  DialogsListStore,
} from "../../../DialogsLIst/DialogsList.model";

export const SendMessage = () => {
  const [inputValue, setInputValue] = useState("");
  const store = useStore(HomeStore);
  const dialogsListStore = useStore(DialogsListStore);

  return (
    <form className="send-form">
      <span className="send-form__stickers">
        <img src={smile} alt="smile icon" />
      </span>
      <TextareaAutosize
        maxRows={4}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter message text"
        className="send-form__input"
        onKeyDown={(e: any) => {
          if (e.key === "Enter" || e.key === "NumpadEnter") {
            console.log(dialogsListStore.potentialDialog?.id, store.currentDialog.id);
            store.currentDialog.id.length > 0
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
        }}
      />
      <span className="send-form__photo">
        <img src={photo} alt="phoo icon" />
      </span>
      <span className="send-form__voice">
        <img src={voice} alt="voice icon" />
      </span>
      <button
        onClick={() => {
          store.currentDialog.id
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
        }}
        type="button"
        className="send-form__submit"
      >
        <img src={send} alt="send icon" />
      </button>
    </form>
  );
};
