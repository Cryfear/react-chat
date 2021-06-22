import React, {useEffect} from "react";

import {Header} from "./Header/Header";
import {SearchDialogs} from "./SearchDialogs/SearchDialogs";

import "./DialogsList.scss";
import {
  DialogsListStore,
  DialogsLoaderFx, onScrollLoaderFx,
  UsersLoaderFx,
} from "./DialogsList.model";
import {useStore} from "effector-react";
import {UserDialogsContainer} from "./UserDialogs/UserDialogsContainer";

export const DialogsList = () => {
  const store = useStore(DialogsListStore);

  useEffect(() => {
    if (store.dialogs.length < 1)
      DialogsLoaderFx({id: sessionStorage["id"], page: 0});
    if (store.users.length < 1) UsersLoaderFx(store.usersSearchPage);
  });

  return (
    <div onScroll={(e) => onScrollLoaderFx({e, page: store.usersSearchPage})} className="dialogs-list">
      <Header/>
      <SearchDialogs/>
      <UserDialogsContainer
        users={store.users}
        dialogs={store.dialogs}
        isUserSearch={store.isUserSearch}
      />
    </div>
  );
};
