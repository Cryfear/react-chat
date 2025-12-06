import React from "react";
import { UserDialogs } from "./UserDialogs";
import { useCreatingUsersList } from "../../../../hooks/useCreatingUsersList";
import { useCreatingDialogsList } from "../../../../hooks/useCreatingDialogsList";
import { createEvent, createStore } from "effector";
import { useUnit } from "effector-react";
import { $DialogsListStore } from "../DialogsList.model";
import { $UsersListStore } from "./UsersList.model";

export const $isUserSearch = createStore(false);
export const changeUserSearch = createEvent();

$isUserSearch.on(changeUserSearch, (state) => !state);

export const UserDialogsContainer = () => {
  const { dialogsStore, usersStore, isUserSearch } = useUnit({
    dialogsStore: $DialogsListStore,
    usersStore: $UsersListStore,
    isUserSearch: $isUserSearch,
  });

  const dialogs = useCreatingDialogsList(dialogsStore.dialogs);
  const users = useCreatingUsersList(usersStore.users);

  return <UserDialogs isUserSearch={isUserSearch} Dialogs={dialogs} Users={users} />;
};
