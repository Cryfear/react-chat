import React, {useEffect, useRef} from "react";

import {Header} from "./Header/Header";
import {SearchDialogs} from "./SearchDialogs/SearchDialogs";

import "./DialogsList.scss";
import {
  DialogsListStore,
  DialogsLoaderFx,
  onScrollUsersLoaderFx,
  UsersLoaderFx,
  onScrollDialogsLoaderFx,
} from "./DialogsList.model";
import {useStore} from "effector-react";
import {UserDialogsContainer} from "./UserDialogs/UserDialogsContainer";
import debounce from 'debounce';


export const DialogsList = () => {
  const store = useStore(DialogsListStore);
  const pedik: any = useRef(null);

  useEffect(() => {
    DialogsLoaderFx({id: sessionStorage["id"], page: 0});
    UsersLoaderFx(0);
  }, []);

  return (
    <div className="dialogs-list" ref={pedik} onScroll={(e: any) => {
      return store.isUserSearch
        ? onScrollUsersLoaderFx({e, page: store.usersSearchPage})
        : onScrollDialogsLoaderFx({
          e,
          id: sessionStorage["id"],
          page: store.dialogsSearchPage,
        });
    }}>
      <Header/>
      <SearchDialogs/>
      <UserDialogsContainer
        users={store.users}
        dialogs={store.dialogs}
        isUserSearch={store.isUserSearch}
      />
    </div>
  );
}
