import classNames from "classnames";
import { useUnit } from "effector-react";
import { $Show_Hide_ButtonStore, isOpenDialogsSwitcherFx } from "./Show-hide-button.model";

import "./Show-hide-button.scss";

export const ShowHideButton = () => {
  const { isOpenDialogs } = useUnit($Show_Hide_ButtonStore);

  const buttonClass = classNames(isOpenDialogs ? "show-dialogs__button" : "hide-dialogs__button");

  return <div className={buttonClass} onClick={() => isOpenDialogsSwitcherFx()}></div>;
};
