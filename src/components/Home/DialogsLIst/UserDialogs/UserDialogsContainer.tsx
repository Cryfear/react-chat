import React from "react";
import { UserDialogs } from "./UserDialogs";
import { useStore } from "effector-react";
import { DialogsListStore } from "../DialogsList.model";
import { useCreatingUsersList } from "../../../../hooks/useCreatingUsersList";
import { useCreatingDialogsList } from "../../../../hooks/useCreatingDialogsList";

export type UserDialogsTypes = {
  isUserSearch: boolean;
  Users: ItemTypes[];
  Dialogs: ItemTypes[];
};

export type ItemTypes = {
  avatar: string;
  fullName: string;
  id: string;
  isOnline: boolean;
};

export const UserDialogsContainer = ({ dialogs, users, isUserSearch }: any) => {
  const store = useStore(DialogsListStore);

  const Dialogs = useCreatingDialogsList(dialogs, store.unConvertedDialogs);
  const Users = useCreatingUsersList(users);

  return (
    <UserDialogs isUserSearch={isUserSearch} Dialogs={Dialogs} Users={Users} />
  );
};
