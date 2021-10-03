import classNames from "classnames";
import { useStore } from "effector-react";
import React from "react";
import { Show_Hide_ButtonStore, isOpenDialogsSwitcherFx } from "./Show-hide-button.model";

import "./Show-hide-button.scss";

export const ShowHideButton = () => {
  const store = useStore(Show_Hide_ButtonStore);

  const buttonClass = classNames(
    store.isOpenDialogs ? "show-dialogs__button" : "hide-dialogs__button"
  );

  return <div className={buttonClass} onClick={() => isOpenDialogsSwitcherFx()}></div>;
};
