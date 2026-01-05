import "./MessagesTypes.scss";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useUnit } from "effector-react";
import { EmptyDialog } from "../EmptyDialog/EmptyDialog";
import { Messages } from "./Messages";
import { $myUserData } from "@stores/Login.model";
import { MemoMessageItem } from "./MessagesTypes/MessageItem";
import { Loading } from "@/utils/Loading";
import { socket } from "@/socket";
import { $currentDialogMessages,  socketMessageReceived } from "@/store/home";

export const MessagesContainer = ({
  setShowEmojiPicker,
  loading,
}: {
  loading: boolean;
  setShowEmojiPicker: Dispatch<SetStateAction<boolean>>;
}) => {
  const { currentDialogMessages, myUserData } = useUnit({
    currentDialogMessages: $currentDialogMessages,
    myUserData: $myUserData,
  });

  useEffect(() => {
    socket.emit("join", myUserData.id);

    socket.on("message:new", (message) => {
      socketMessageReceived(message);
    });

    return () => {
      socket.off("message:new");
    };
  }, [myUserData.id]);

  const isEmptyDialog = !(currentDialogMessages && currentDialogMessages.length > 0);

  const messages = currentDialogMessages.map((item) => {
    return item ? (
      <div key={item._id}>
        <MemoMessageItem
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
