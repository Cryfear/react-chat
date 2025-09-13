import "./Header.scss";
import { Header } from "./Header";
import { useUnit } from "effector-react";
import { $HomeStore } from "../../Home.model";
import { $DialogsListStore } from "../../DialogsLIst/DialogsList.model";
import React from 'react';

export const HeaderWrapper = () => {
  const store = useUnit($HomeStore);
  const dialogsListStore = useUnit($DialogsListStore);

  const userName =
    store.currentUser !== null || dialogsListStore.potentialDialog !== null
      ? store.currentUser?.name || dialogsListStore.potentialDialog?.name
      : "undefined";
  const isOnline =
    store?.currentUser?.isOnline || dialogsListStore?.potentialDialog?.isOnline
      ? "online"
      : "offline";
  const userId = store.currentUser && store.currentUser.id ? store.currentUser.id : 'null';

  return (
    <Header userName={userName} isOnline={isOnline} userId={userId} />
  );
};
