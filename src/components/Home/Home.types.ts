import React from "react";

export type messageType = {
  content: {
    dialog: {
      _id: string
    },
    creater: string,
    date: Date,
    isReaded: boolean,
    _id: string
  },
  to: string,
  _id: string
}

export type initialiseDialogFxTypes = {
  name: string,
  userId: string,
  avatar: string,
  isOnline: boolean,
  currentDialogID: string,
  currentDialogTyping: boolean,
  currentDialogOpponentId: string,
  currentDialogMessages: any
}

export type HomeStoreTypes = {
  isInitialisedDialog: boolean;
  loadedDialog: boolean;
  currentUser: null | {
    name: string,
    id: string,
    avatar: string,
    isOnline: boolean,
  };
  currentDialog: {
    id: string;
    isTyping: boolean;
    page: number;
    unreadedPage: number;
    opponentId: string;
  };
  currentDialogMessages: any;
  messageSent: boolean;
}

export type usersType = {
  avatar: string,
  fullName: string,
  id: string
  isOnline: boolean
}

export type initDialogTypes = {
  userId: string,
  myId: string,
  page: number
}

export type unreadMessagesLoaderTypes = {
  dialogId: string,
  unreadedPage: number,
  userId: string
}

export type onScrollLoaderMessagesTypes = {
  dialogId: string,
  unreadedPage: number,
  userId: string,
  page: number,
  myId: string,
  ref: React.RefObject<HTMLInputElement>
}

export type unreadMesssagesFxTypes = {
  dialogId: string,
  userId: string
}

export type dialogPromiseType = {
  data: {
    users: [
      _id1: string,
      _id2: string
    ],
    isTyping: boolean,
    _id: string
  }
}

export type promiseDialogsTypes = {
  data: [{users: [string, string]}]
}

export type MessageDataTypes = {
  creater: string,
  dialog: {
    users: [_id: string],
  },
  data: string
}

export type DialogsListStoreTypes = {
  initialisedDialogs: boolean,
  initialisedUsers: boolean,
  dialogs: [], // уже готовые сконвертированные диалоги для DialogItem
  unConvertedDialogs: [], // несконвертированные диалоги
  users: [],
  isUserSearch: boolean,
  usersSearchPage: number,
  dialogsSearchPage: number,

  potentialDialog: null | {
    isOnline: boolean,
    name: string,
    id: string
  },
}

export type OpenedProfileTypes = {
  isOpen: boolean;
  name: string;
  avatar: string;
};

export type DialogsPreviewType = {
  avatar: string
  fullName: string,
  id: string, // айди пользователя
  isOnline: string
}

export type unconvertedDialogType = {
  createdAt: string,
  isTyping: boolean
  updatedAt: string,
  users: string[],
  _id: string
}

export type MessageType = {
  createdAt: string, // во сколько создано сообщение
  creater: string, // кто его написал,
  date: string, // когда было создано сообщение изначально
  data: string, // содержание сообщения
  dialog: string, // айди диалога
  isReaded: boolean, // прочитал ли собеседник это сообщение
  updatedAt: string // если сообщение было редактировано, будем знать когда
  _id: string, // айди сообщения
}