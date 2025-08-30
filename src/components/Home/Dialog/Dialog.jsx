import React from "react";
import { Content } from "./Content/Content";

import "./Dialog.scss";
import svg from "../../../assets/waving-hand.svg";
import { useStore } from "effector-react";
import { HomeStore } from "../Home.model";
import { DialogsListStore } from "../DialogsLIst/DialogsList.model";
import { HeaderWrapper } from "./Header/HeaderWrapper";

export const Dialog = () => {
  const $HomeStore = useStore(HomeStore);
  const $DialogsListStore = useStore(DialogsListStore);

  if ($DialogsListStore.potentialDialog !== null) {
    return (
      <div className="dialog__wrapper">
        <HeaderWrapper />
        <Content />
      </div>
    );
  }

  return $HomeStore.isInitialisedDialog ? (
    <div className="dialog__wrapper">
      <HeaderWrapper />
      <Content />
    </div>
  ) : (
    <div className="empty__dialog">
      <img src={svg} alt="hand" />
      <h2>
        Choose the dialog to chat with someone! Or try to find your new friend
        and send him a Message!
      </h2>
    </div>
  );
};
