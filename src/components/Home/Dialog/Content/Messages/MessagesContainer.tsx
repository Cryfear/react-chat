import "./MessagesTypes.scss";
import React from "react";
import { useUnit } from "effector-react";
import { EmptyDialog } from "../EmptyDialog/EmptyDialog";
import { Messages } from "./Messages";
import { $myUserData } from "@stores/Login.model";
import { MemoMessageItem } from "./MessagesTypes/MessageItem";
import { Loading } from "@/utils/Loading";
import { socket } from "@/socket";
import { $currentDialog, $currentDialogMessages, socketMessageReceived } from "@/store/home";
import { ISocketMessage } from "@/types/Home.types";
import { setIsTyping } from "@/store/Typing.model";

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
  const { currentDialogMessages, myUserData, currentDialog } = useUnit({
    currentDialogMessages: $currentDialogMessages,
    myUserData: $myUserData,
    currentDialog: $currentDialog,
  });

  React.useEffect(() => {
    const handler = (message: ISocketMessage) => {
      socketMessageReceived(message);
      setIsTyping({ from: null });
    };

    const handleTypingStart = ({ dialogId, from }: { dialogId: string; from: string }) => {
      if (dialogId === currentDialog.id) {
        setIsTyping({ from: true });
      }
    };

    const handleTypingStop = ({ dialogId }: { dialogId: string }) => {
      if (dialogId === currentDialog.id) {
        setIsTyping({ from: false });
      }
    };

    socket.on("message:new", handler);
    socket.on("typing:start", handleTypingStart);
    socket.on("typing:stop", handleTypingStop);

    return () => {
      socket.off("message:new", handleTypingStart);
      socket.off("typing:start", handleTypingStop);
      socket.off("typing:stop", handleTypingStop);
    };
  }, [currentDialog.id]);

  const isEmptyDialog = !(currentDialogMessages && currentDialogMessages.length > 0);

  const messages = React.useMemo(() => {
    return currentDialogMessages.map((item) => {
      if (!item) return null;

      return (
        <div key={item._id}>
          <MemoMessageItem
            avatar={myUserData.avatar}
            data={item.data}
            date={item.date}
            isReaded={item.isReaded}
            type={item.enum}
            mine={item.creater === myUserData.id}
          />
        </div>
      );
    });
  }, [currentDialogMessages, myUserData]);

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
