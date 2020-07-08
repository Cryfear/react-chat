export interface StateTypes {
  // home-reducer
  users: Array<any>;
  dialogs: Array<Object>;
  activeDialog: String;
  searchPage: number;
  isSearch: Boolean;
  messages: Array<any>;
}

export interface HomeActions {
  type: String;
  users: Array<any>;
  dialogId: String;
  dialogs: Array<any>;
  messages: Array<any>;
}

export interface HomeContainerTypes {
  setIsLoginUserAction: Function;
  isAuth: Boolean;
  getUsersAction: Function;
  page: Number;
  users: Array<Object>;
  setActiveDialogAction: Function;
  setSearchPageAction: Function;
  setIsSearchAction: Function;
  isSearch: Boolean;
}

export interface HomeTypes {
  setPage: Function;
  getUsers: Function;
  setSearch: Function;
  page: Number;
  isSearch: Boolean;
  users: Array<Object>;
}

export interface DialogsSearchGuysTypes {
  users: Array<Object>;
  isSearch: Boolean;
  getUsers: Function;
  page: Number;
}

export interface DialogsRoutesTypes {
  isSearch: Boolean;
  users: any;
  getUsers: Function;
  page: Number;
}

export interface DialogsTypes {
  getUsers: Function;
  page: Number;
}

export interface SearchTypes {
  isSearch: Boolean;
  users: any;
  getUsers: Function;
  page: Number;
  setActiveDialogAction: Function;
  myId: String;
  createDialogAction: Function;
  dialogId: String;
}

export interface SearchitemTypes {
  fullName: string;
  id: string;
  avatar: string;
  isOnline: boolean;
}

export interface MessagesInputWrapperTypes {
  dialogId: string;
  myId: string;
  createMessage: Function;
}

export interface MessagesTypes {
  getMessagesAction: Function;
  dialogId: string;
  myId: string;
  users: Array<any>;
  createMessageAction: Function;
  messages: Array<any>;
}

export interface MessagesWrapperTypes {
  messages: Array<messageTypes> | null;
  myId: string;
}

interface messageTypes {
  data: string;
  creater: string;
  length: number;
}

export interface UsersRouterTypes {
  user: any;
  dialogId: string;
  messages: any;
  myId: string;
  createMessage: Function;
}
