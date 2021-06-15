import React, { useEffect } from "react";

import Header from "./Header/Header";
import SearchDialogs from "./SearchDialogs/SearchDialogs";
import UserDialogs from "./UserDialogs/UserDialogs";

import "./DialogsList.scss";
import { DialogsListStore, DialogsLoaderFx, UsersLoaderFx } from "./DialogsList.model";
import { useStore } from "effector-react";

const DialogsList = () => {
  const store = useStore(DialogsListStore);
  useEffect(() => {
    if (!store.dialogs) DialogsLoaderFx({id: sessionStorage["id"], page: 0});
    if (store.users.length < 1) UsersLoaderFx({id: sessionStorage["id"]});
  });

  return (
    <div className="dialogs-list">
      <Header />
      <SearchDialogs />
      <UserDialogs users={store.users} userSearch={store.userSearch} dialogs={store.dialogs}/>
    </div>
  );
};

export default DialogsList;
