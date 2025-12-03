import React from "react";

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

export type initialiseDialogFxTypes = {
  name: string;
  userId: string;
  avatar: string;
  isOnline: boolean;
  currentDialogID: string;
  currentDialogTyping: boolean;
  currentDialogOpponentId: string;
  currentDialogMessages: any;
};

export type HomeStoreTypes = {
  isInitialisedDialog: boolean;
  isDialogFullLoaded: boolean;
  loadedDialog: boolean;
  currentUser: any | {
    name: string;
    id: string;
    avatar: string;
    isOnline: boolean;
  };
  currentDialog: {
    isTyping: boolean;
    page: number;
    id: string;
    unreadedPage: number;
  };
  currentDialogMessages: any;
  messageSent: boolean;
};

export type usersType = {
  avatar: string;
  fullName: string;
  id: string;
  isOnline: boolean;
};

export type initDialogTypes = {
  userId: string;
  myId: string;
  page: number;
};

export type onScrollLoaderMessagesTypes = {
  dialogId: string;
  page: number;
  myId: string;
  ref: React.RefObject<HTMLDivElement>;
  isDialogFullLoaded: boolean;
};

export type unreadMesssagesFxTypes = {
  dialogId: string;
  userId: string;
};

export type dialogPromiseType = {
  data: {
    users: [_id1: string, _id2: string];
    isTyping: boolean;
    _id: string;
  };
};

export type promiseDialogsTypes = {
  data: [{ users: [string, string] }];
};

export type DialogsListStoreTypes = {
  initialisedDialogs: boolean;
  initialisedUsers: boolean;
  dialogs: [];
  users: [];
  isUserSearch: boolean;
  usersSearchPage: number;
  dialogsSearchPage: number;
};

export type OpenedProfileTypes = {
  isOpen: boolean;
  name: string;
  avatar: string;
};

export type DialogsPreviewType = {
  user: {
    avatar: string;
    fullName: string;
    id: string; // айди пользователя
    isOnline: string;
  };
  id: string;
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
};
