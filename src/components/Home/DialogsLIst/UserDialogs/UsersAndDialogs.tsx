import React from "react";
import { useUnit } from "effector-react";
import { $isUserSearch, $UsersListStore } from "@stores/UsersList.model";
import { $DialogsListStore } from "@stores/DialogsList.model";
import { $isDialogsLoading } from "@/gates/DialogListGate";
import { SkeletonItems } from "./SkeletonItems/SkeletonItems";
import { MemoDialogItem } from "./DialogItem/DialogItem";
import { IDialog, usersType } from "@/types/Home.types";
import { MemoUserItem } from "./UserItem/UserItem";
import "./UserDialogs.scss";

export const UsersAndDialogs = () => {
  const { dialogs, users, isUserSearch, isLoading } = useUnit({
    dialogs: $DialogsListStore.map((s) => s.dialogs),
    users: $UsersListStore.map((s) => s.users),
    isUserSearch: $isUserSearch,
    isLoading: $isDialogsLoading,
  });

  const dialogsComponents =
    dialogs?.length > 0
      ? dialogs.map((dialog: IDialog) => {
          return (
            <MemoDialogItem
              unreadCount={dialog.unreadCount}
              lastMessageDate={dialog.lastMessageDate}
              lastMessage={dialog.lastMessage}
              avatar={dialog.user?.avatar}
              fullName={dialog.user?.fullName}
              isOnline={dialog.user?.isOnline}
              _id={dialog.user?._id}
              key={dialog._id}
            />
          );
        })
      : null;

  const usersComponents =
    users?.length > 0
      ? users.map((userData: usersType) => {
          return <MemoUserItem {...userData} key={userData.id} />;
        })
      : null;

  if (isLoading) return <SkeletonItems />;

  return <div className="dialogs">{isUserSearch ? usersComponents : dialogsComponents}</div>;
};
