export interface StateTypes {
  // home-reducer
  users: Array<any>;
  dialogs: Array<Object>;
  activeDialog: String;
  searchPage: number;
  isSearch: Boolean;
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
  createDialogAction: Function
}

export interface SearchitemTypes {
  fullName: string;
  id: string;
  avatar: string;
  isOnline: boolean;
}
