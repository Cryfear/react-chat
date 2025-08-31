import React from "react";
import {UserDialogs} from "./UserDialogs";
import {useStore} from "effector-react";
import {DialogsListStore} from "../DialogsList.model";
import {useCreatingUsersList} from "../../../../hooks/useCreatingUsersList";
import { useCreatingDialogsList} from "../../../../hooks/useCreatingDialogsList";
import {DialogsPreviewType, usersType} from "../../Home.types";

export const UserDialogsContainer = ({Dialogs, Users, isUserSearch}: {
  Dialogs: DialogsPreviewType[], Users: usersType[], isUserSearch: boolean
}) => {
  const store = useStore(DialogsListStore);

  const dialogs = useCreatingDialogsList({Dialogs, unConvertedDialogs: store.unConvertedDialogs});
  const users = useCreatingUsersList(Users);

  return (
    <UserDialogs isUserSearch={isUserSearch} Dialogs={dialogs} Users={users}/>
  );
};
