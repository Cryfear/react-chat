import "./Header.scss";
import { Header } from "./Header";
import { useUnit } from "effector-react";
import { $HomeStore } from "../../Home.model";
import React from "react";

export const HeaderWrapper = () => {
  const store = useUnit($HomeStore);

  const userName =
    store.currentUser !== null ? store.currentUser?.name : "undefined";
  const isOnline = store?.currentUser?.isOnline ? "online" : "offline";
  const userId =
    store.currentUser && store.currentUser.id ? store.currentUser.id : "null";

  return <Header userName={userName} isOnline={isOnline} userId={userId} />;
};
