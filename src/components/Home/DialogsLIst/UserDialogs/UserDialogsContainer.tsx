import React from "react";
import { UserDialogs } from "./UserDialogs";
import { useCreatingUsersList } from "../../../../hooks/useCreatingUsersList";
import { useCreatingDialogsList } from "../../../../hooks/useCreatingDialogsList";
import { createEvent, createStore } from "effector";
import { useUnit } from "effector-react";
import { $UsersListStore } from "@stores/UsersList.model";
import { $DialogsListStore } from "@stores/DialogsList.model";
import { $isDialogsLoading } from "@/gates/DialogListGate";
import { SkeletonItems } from "./SkeletonItems/SkeletonItems";

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

  const isLoading = useUnit($isDialogsLoading);

  if(isLoading) {  
    return <SkeletonItems />
  }

  return <UserDialogs isUserSearch={isUserSearch} Dialogs={dialogs} Users={users} />;
};
