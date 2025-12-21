import "./MessagesTypes.scss";
import { useUnit } from "effector-react";
import { $HomeStore } from "../../../../../store/Home.model";
import { useRef } from "react";
import { EmptyDialog } from "../EmptyDialog/EmptyDialog";
import { Messages } from "./Messages";
import { creatingMessagesList } from "@hooks/useCreatingMessagesList";
import { $LoginStore } from "@stores/Login.model";

export const MessagesContainer = ({ setShowEmojiPicker }: any) => {
  const { currentDialogMessages } = useUnit($HomeStore);
  const authStore = useUnit($LoginStore);

  const onSendScrollRef = useRef<HTMLDivElement>(null);

  const isEmptyDialog = !(currentDialogMessages && currentDialogMessages.length > 0);
  const messages = creatingMessagesList(currentDialogMessages, onSendScrollRef, authStore.myUserData.id);

  // if(true) {
  //   return (
  //     <div className="app-loading">
  //       <div className="loading-spinner">
  //         <div className="spinner"></div>
  //         <p>Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return isEmptyDialog ? <EmptyDialog /> : <Messages setShowEmojiPicker={setShowEmojiPicker} messages={messages} />;
};
