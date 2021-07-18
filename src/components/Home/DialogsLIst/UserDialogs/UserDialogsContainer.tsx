import {DialogItem} from "./DialogItem/DialogItem";
import React from "react";
import {UsersSearchItem} from "./UsersSearchItem/UsersSearchItem";
import {UserDialogs} from "./UserDialogs";
import { useStore } from "effector-react";
import { DialogsListStore } from "../DialogsList.model";

export type UserDialogsTypes = {
  isUserSearch: boolean,
  Users: ItemTypes[],
  Dialogs: ItemTypes[]
}

export type ItemTypes = {
  avatar: string,
  fullName: string,
  id: string,
  isOnline: boolean
}

export const UserDialogsContainer = ({dialogs, users, isUserSearch}: any) => {
  const store = useStore(DialogsListStore);

  const Dialogs = dialogs && dialogs.length > 0 ?
    dialogs.map((dialog: ItemTypes, index: number) => {
      return <DialogItem dialogId={store.unConvertedDialogs[index]._id} {...dialog} key={index}/>
    }) : <div />

  const Users = users && users.length > 0 ?
    users.map((userData: ItemTypes, index: number) => {
      return <UsersSearchItem{...userData} key={index}/>
    }) : <div />

  return (
    <UserDialogs isUserSearch={isUserSearch} Dialogs={Dialogs} Users={Users}/>
  )
}

