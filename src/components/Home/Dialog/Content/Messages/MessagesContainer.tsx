import "./MessagesTypes.scss";
import React from "react";
import { useUnit } from "effector-react";
import { EmptyDialog } from "../EmptyDialog/EmptyDialog";
import { Messages } from "./Messages";
import { $myUserData } from "@stores/Login.model";
import { MemoMessageItem } from "./MessagesTypes/MessageItem";
import { Loading } from "@/utils/Loading";
import { $currentDialog, $currentDialogMessages, $currentUser, socketMessageReceived } from "@/store/home";
import { ISocketMessage } from "@/types/Home.types";
import { setIsTyping } from "@/store/Typing.model";
import { getSocket } from "@/socket";

const TypingComponent = React.memo(() => {
  return <div className="content__messages-typing">Печатает...</div>;
});

export const MessagesContainer = ({
  setShowEmojiPicker,
  loading,
}: {
  loading: boolean;
  setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { currentDialogMessages, myUserData, currentDialog, currentUser } = useUnit({
    currentDialogMessages: $currentDialogMessages,
    myUserData: $myUserData,
    currentDialog: $currentDialog,
    currentUser: $currentUser
  });

  React.useEffect(() => {
    const handler = (message: { data: ISocketMessage }) => {
      socketMessageReceived(message.data);
      setIsTyping({ from: null });
    };

    const handleTypingStart = ({ dialogId }: { dialogId: string }) => {
      if (dialogId === currentDialog.id) {
        setIsTyping({ from: true });
      }
    };

    const handleTypingStop = ({ dialogId }: { dialogId: string }) => {
      if (dialogId === currentDialog.id) {
        setIsTyping({ from: false });
      }
    };

    const socket = getSocket();

    socket.on("message:new", handler);
    socket.on("typing:start", handleTypingStart);
    socket.on("typing:stop", handleTypingStop);

    return () => {
      socket.off("message:new", handler);
      socket.off("typing:start", handleTypingStart);
      socket.off("typing:stop", handleTypingStop);
    };
  }, [currentDialog.id]);

  const isEmptyDialog = !(currentDialogMessages && currentDialogMessages.length > 0);

  const messages = React.useMemo(() => {
    return currentDialogMessages.map((item) => {
      if (!item) return null;
      const avatar = item.creater === myUserData.id ? myUserData.avatar : currentUser?.avatar || '';

      return (
        <div key={item._id}>
          <MemoMessageItem
            avatar={avatar}
            data={item.data}
            date={item.date}
            isReaded={item.isReaded}
            type={item.enum}
            mine={item.creater === myUserData.id}
          />
        </div>
      );
    });
  }, [currentDialogMessages, myUserData, currentUser.avatar]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {isEmptyDialog ? <EmptyDialog /> : <Messages setShowEmojiPicker={setShowEmojiPicker} messages={messages} />}
      {currentDialog.isTyping ? <TypingComponent /> : null}
    </>
  );
};
