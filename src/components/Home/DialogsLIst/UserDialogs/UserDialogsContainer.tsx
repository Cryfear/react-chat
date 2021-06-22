import {DialogItem} from "./DialogItem/DialogItem";
import React from "react";
import {UsersSearchItem} from "./UsersSearchItem/UsersSearchItem";
import {UserDialogs} from "./UserDialogs";

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

  const Dialogs = dialogs.length > 1 ? dialogs.map((dialogData: ItemTypes, index: number) => {
    return <DialogItem {...dialogData} key={index}/>
  }) : <DialogItem {...dialogs}/>
  const Users = users.length > 1 ? users.map((userData: ItemTypes, index: number) => {
    return <UsersSearchItem{...userData} key={index}/>
  }) : <UsersSearchItem {...users} />

  return (
    <UserDialogs isUserSearch={isUserSearch} Dialogs={Dialogs} Users={Users}/>
  )
}

