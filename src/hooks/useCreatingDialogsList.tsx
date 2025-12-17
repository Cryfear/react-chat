import { DialogItem } from "@components/Home/DialogsList/UserDialogs/DialogItem/DialogItem";
import { DialogsPreviewType } from "@/types/Home.types";

export const useCreatingDialogsList = (dialogs: DialogsPreviewType[]) => {
  return dialogs && dialogs.length > 0 ? (
    dialogs.map((dialog) => {
      return (
        <DialogItem
          unreadCount={dialog.unreadCount}
          lastMessageDate={dialog.lastMessageDate}
          lastMessage={dialog.lastMessage}
          {...dialog.user}
          key={dialog._id}
        />
      );
    })
  ) : (
    <div />
  );
};
