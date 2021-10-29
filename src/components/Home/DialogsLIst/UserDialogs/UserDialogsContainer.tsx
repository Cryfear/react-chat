import React from "react";
import { UserDialogs } from "./UserDialogs";
import { useStore } from "effector-react";
import { DialogsListStore } from "../DialogsList.model";
import { useCreatingUsersList } from "../../../../hooks/useCreatingUsersList";
import { useCreatingDialogsList } from "../../../../hooks/useCreatingDialogsList";

export type UserDialogsContainerTypes = {
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

export const UserDialogsContainer = ({ Dialogs, Users, isUserSearch }: UserDialogsContainerTypes) => {
  const store = useStore(DialogsListStore);

  const dialogs: JSX.Element | JSX.Element[] = useCreatingDialogsList({Dialogs, unConvertedDialogs: store.unConvertedDialogs});
  const users: JSX.Element | JSX.Element[] = useCreatingUsersList(Users);

  return (
    <UserDialogs isUserSearch={isUserSearch} Dialogs={dialogs} Users={users} />
  );
};
