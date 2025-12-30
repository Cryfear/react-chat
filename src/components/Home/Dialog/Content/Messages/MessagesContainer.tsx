import "./MessagesTypes.scss";
import React, { Dispatch, SetStateAction } from "react";
import { useUnit } from "effector-react";
import { $HomeStore } from "../../../../../store/Home.model";
import { EmptyDialog } from "../EmptyDialog/EmptyDialog";
import { Messages } from "./Messages";
import { $LoginStore } from "@stores/Login.model";
import { MemoMessageItem } from "./MessagesTypes/MessageItem";
import { Loading } from "@/utils/Loading";

export const MessagesContainer = ({
  setShowEmojiPicker,
  loading,
}: {
  loading: boolean;
  setShowEmojiPicker: Dispatch<SetStateAction<boolean>>;
}) => {
  const { currentDialogMessages, myUserData, currentUser } = useUnit({
    currentDialogMessages: $HomeStore.map((s) => s.currentDialogMessages),
    myUserData: $LoginStore.map((s) => s.myUserData),
    currentUser: $LoginStore.map((s) => s.myUserData),
  });

  const isEmptyDialog = !(currentDialogMessages && currentDialogMessages.length > 0);

  const messages = currentDialogMessages.map((item) => {
    return item ? (
      <div key={item._id}>
        <MemoMessageItem
          currentUser={currentUser}
          myUserData={myUserData}
          data={item.data}
          date={item.date}
          isReaded={item.isReaded}
          id={item._id}
          type={item?.enum}
          mine={item.creater === myUserData.id}
        />
      </div>
    ) : null;
  });

  if (loading) {
    return <Loading />;
  }

  return isEmptyDialog ? <EmptyDialog /> : <Messages setShowEmojiPicker={setShowEmojiPicker} messages={messages} />;
};
