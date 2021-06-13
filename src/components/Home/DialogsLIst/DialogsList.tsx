import React, { useEffect } from "react";

import Header from "./Header/Header";
import SearchDialogs from "./SearchDialogs/SearchDialogs";
import UserDialogs from "./UserDialogs/UserDialogs";

import "./DialogsList.scss";
import { DialogsListStore, DialogsLoaderFx } from "./DialogsList.model";
import { useStore } from "effector-react";

const DialogsList = () => {
  const store = useStore(DialogsListStore);

  useEffect(() => {
    if (!store.dialogs) DialogsLoaderFx({id: sessionStorage["id"], page: 0})
  });

  return (
    <div className="dialogs-list">
      <Header />
      <SearchDialogs />
      <UserDialogs />
    </div>
  );
};

export default DialogsList;
