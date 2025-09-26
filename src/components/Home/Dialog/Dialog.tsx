import React from "react";
import { Content } from "./Content/Content";

import "./Dialog.scss";
import { useUnit } from "effector-react";
import { $DialogsListStore } from "../DialogsLIst/DialogsList.model";
import { HeaderWrapper } from "./Header/HeaderWrapper";

export const Dialog = () => {
  const { dialogsListStore } = useUnit({ dialogsListStore: $DialogsListStore });

  if (dialogsListStore.potentialDialog !== null) {
    return (
      <div className="dialog__wrapper">
        <HeaderWrapper />
        <Content />
      </div>
    );
  }

  return (
    <div className="dialog__wrapper">
      <HeaderWrapper />
      <Content />
    </div>
  )
};
