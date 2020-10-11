export interface StateTypes {
  // home-reducer
  users: Array<any>;
  dialogs: Array<Object>;
  myDialogs: any;
  activeDialog: string;
  searchPage: number;
  isSearch: Boolean;
  messages: Array<any>;
}

export interface HomeActions {
  type: string;
  users: Array<any>;
  dialogId: string;
  dialogs: Array<any>;
  messages: Array<any>;
  myDialogs: Array<any>;
  partner: any;
}

export interface HomeContainerTypes {
  setIsLoginUserAction: Function;
  isAuth: Boolean;
  getUsersAction: Function;
  page: number;
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
  page: number;
  isSearch: Boolean;
  users: Array<Object>;
}

export interface DialogsSearchGuysTypes {
  users: Array<Object>;
  isSearch: Boolean;
  getUsers: Function;
  page: number;
}

export interface DialogsRoutesTypes {
  isSearch: Boolean;
  users: any;
  getUsers: Function;
  page: number;
}

export interface DialogsTypes {
  getUsers: Function;
  page: number;
  users: Array<any>;
  getMyDialogs: Function;
  id: string;
  myDialogs: any;
}

export interface SearchTypes {
  isSearch: Boolean;
  users: any;
  getUsers: Function;
  page: number;
  setActiveDialogAction: Function;
  myId: string;
  createDialogAction: Function;
  dialogId: string;
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
  avatar: string;
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
