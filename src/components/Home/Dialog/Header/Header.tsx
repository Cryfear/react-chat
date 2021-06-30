import React from "react";
import dots from "../../../../assets/dots.svg";
import "./Header.scss";
import { useStore } from "effector-react";
import { HomeStore } from "../../Home.model";

export const Header = () => {
  const store = useStore(HomeStore);

  const userName =
    store.currentUser !== null ? store.currentUser.name : "undefined";
  const isOnlineClassName =
    store.currentUser !== null && store.currentUser.isOnline
      ? "online"
      : "offline";

  return (
    <div className="dialog__header">
      <div className="dialog__header-name">
        <h3>{userName}</h3>
        <p className={isOnlineClassName}>
          {isOnlineClassName}
        </p>
      </div>
      <div className="dialog__header-settings">
        <img src={dots} alt="dots" />
      </div>
    </div>
  );
};
