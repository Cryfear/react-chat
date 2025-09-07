import React from "react";

import "./MessagesTypes.scss";
import { useStore } from "effector-react";
import {
  HomeStore,
} from "../../../Home.model";

import { useRef } from "react";
import { EmptyDialog } from "../EmptyDialog/EmptyDialog";
import { Messages } from "./Messages";
import { creatingMessagesList } from "../../../../../hooks/useCreatingMessagesList";
import { $LoginStore } from "../../../../Auth/Login/Login.model";

export const MessagesContainer = () => {
  const { currentDialogMessages } =
    useStore(HomeStore);
  const authStore = useStore($LoginStore);
  
  const onSendScrollRef = useRef<HTMLDivElement>(null);

  const isEmptyDialog = !(
    currentDialogMessages && currentDialogMessages.length > 0
  );
  const messages = creatingMessagesList(
    currentDialogMessages,
    onSendScrollRef,
    authStore.myUserData.id
  );

  return isEmptyDialog ?
    <EmptyDialog />
    :
    <Messages messages={messages} />

};
