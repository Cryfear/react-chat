import React from "react";
import dots from "../../../../assets/dots.svg";
import "./Header.scss";
import { useStore } from "effector-react";
import { HomeStore } from "../../Home.model";
import { DialogsListStore } from "../../DialogsLIst/DialogsList.model";

export const Header = () => {
  const store = useStore(HomeStore);
  const dialogsListStore = useStore(DialogsListStore);

  const userName =
    store.currentUser !== null || dialogsListStore.potentialDialog !== null
      ? store.currentUser?.name || dialogsListStore.potentialDialog?.name
      : "undefined";
  const isOnlineClassName =
    store?.currentUser?.isOnline || dialogsListStore?.potentialDialog?.isOnline
      ? "online"
      : "offline";

  return (
    <div className="dialog__header">
      <div className="dialog__header-name">
        <h3>{userName}</h3>
        <p className={isOnlineClassName}>{isOnlineClassName}</p>
      </div>
      <div className="dialog__header-settings">
        <img src={dots} alt="dots" />
      </div>
    </div>
  );
};
