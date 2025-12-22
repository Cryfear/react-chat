import { useUnit } from "effector-react";
import { $isUserSearch, $UsersListStore } from "@stores/UsersList.model";
import { $DialogsListStore } from "@stores/DialogsList.model";
import { $isDialogsLoading } from "@/gates/DialogListGate";
import { SkeletonItems } from "./SkeletonItems/SkeletonItems";
import "./UserDialogs.scss";
import { DialogItem } from "./DialogItem/DialogItem";
import { usersType } from "@/types/Home.types";
import { UsersSearchItem } from "./UserItem/UserItem";

export const UsersAndDialogs = () => {
  const { dialogsStore, usersStore, isUserSearch } = useUnit({
    dialogsStore: $DialogsListStore,
    usersStore: $UsersListStore,
    isUserSearch: $isUserSearch,
  });

  const dialogs =
    dialogsStore.dialogs.length > 0 ? (
      dialogsStore.dialogs.map((dialog) => {
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
      <></>
    );

  const users =
    usersStore.users.length > 0 ? (
      usersStore.users.map((userData: usersType) => {
        return <UsersSearchItem {...userData} key={userData.id} />;
      })
    ) : (
      <></>
    );

  const isLoading = useUnit($isDialogsLoading);

  if (isLoading) return <SkeletonItems />;

  return <div className="dialogs">{isUserSearch ? users : dialogs}</div>;
};
