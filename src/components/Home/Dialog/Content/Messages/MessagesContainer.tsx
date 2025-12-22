import "./MessagesTypes.scss";
import { useUnit } from "effector-react";
import { $HomeStore } from "../../../../../store/Home.model";
import { EmptyDialog } from "../EmptyDialog/EmptyDialog";
import { Messages } from "./Messages";
import { $LoginStore } from "@stores/Login.model";
import { MessageItem } from "./MessagesTypes/MessageItem";
import { MessageType } from "@/types/Home.types";

export const MessagesContainer = ({ setShowEmojiPicker }: any) => {
  const { currentDialogMessages } = useUnit($HomeStore);
  const authStore = useUnit($LoginStore);

  const isEmptyDialog = !(currentDialogMessages && currentDialogMessages.length > 0);

  const messages = currentDialogMessages.map((item: MessageType) => {
    return item ? (
      <div key={item._id}>
        <MessageItem id={item._id} type={item?.enum} {...item} mine={item.creater === authStore.myUserData.id} />
      </div>
    ) : null;
  });

  // if(true) {
  //   return <Loading />
  // }

  return isEmptyDialog ? <EmptyDialog /> : <Messages setShowEmojiPicker={setShowEmojiPicker} messages={messages} />;
};
