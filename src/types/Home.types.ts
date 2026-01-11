import React from "react";

export type AppStoreTypes = {
  isLoading: boolean;
  isMobileVersion: boolean;
};

export type messageType = {
  content: {
    dialog: {
      _id: string;
    };
    creater: string;
    date: Date;
    isReaded: boolean;
    _id: string;
  };
  to: string;
  _id: string;
};

export type dialogServerType = {
  createdAt: string;
  creater: string;
  data: string;
  date: string;
  dialog: string;
  enum: string;
  isReaded: boolean;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type ISocketMessage = {
  createdAt: string;
  creater: string;
  data: string;
  date: string;
  dialog: string;
  enum: [];
  isReaded: boolean;
  updatedAt: string;
  _id: string;
};

export type HomeStoreTypes = {
  isDialogFullLoaded: boolean;
  loadedDialog: boolean;
  currentUser: {
    name: string | null;
    id: string | null;
    avatar: string | null;
    isOnline: boolean;
  };
  currentDialog: {
    isTyping: boolean;
    page: number;
    id: string;
    unreadedPage: number;
  };
  currentDialogMessages: dialogServerType[];
  messageSent: boolean;
};

export type usersType = {
  avatar: string;
  fullName: string;
  id: string;
  isOnline: boolean;
};

export type initDialogTypes = {
  userId: string | undefined;
  myId: string;
  page: number;
};

export type onScrollLoaderMessagesTypes = {
  dialogId: string;
  page: number;
  myId: string;
  ref: React.RefObject<HTMLDivElement | null>;
  isDialogFullLoaded: boolean;
};

export type unreadMesssagesFxTypes = {
  dialogId: string;
  userId: string;
};

export interface IUser {
  id: string;
  fullName: string;
  avatar: string;
  isOnline: boolean;
}

export interface IDialogPreview {
  id: string;
  user: IUser;
}

export interface IDialog {
  _id: string;
  users: string[];
  isTyping: boolean;
  createdAt: string;
  updatedAt: string;
  lastMessage: string;
  lastMessageDate: string;
  unreadCount: number;
  user?: {
    _id: string;
    avatar: string | undefined;
    fullName: string;
    isOnline: boolean;
  };
}

export type GetMyDialogsResponse = IDialog[];

export interface DialogsListStoreTypes {
  initialisedDialogs: boolean;
  dialogs: IDialog[];
  dialogsSearchPage: number;

  isUserSearch?: boolean;
  users?: IUser[];
  initialisedUsers?: boolean;
  usersSearchPage?: number;
}

export type UsersListStoreTypes = {
  initialisedUsers: boolean;
  users: [];
  usersSearchPage: number;
};

export type OpenedProfileTypes = {
  isOpen: boolean;
  name: string;
  avatar: string;
};

export type MessageType = {
  createdAt: string; // во сколько создано сообщение
  creater: string; // кто его написал,
  date: string; // когда было создано сообщение изначально
  data: string; // содержание сообщения
  dialog: string; // айди диалога
  isReaded: boolean; // прочитал ли собеседник это сообщение
  updatedAt: string; // если сообщение было редактировано, будем знать когда
  _id: string; // айди сообщения
  enum: string;
  blob: Blob;
};
