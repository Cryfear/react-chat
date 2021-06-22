import React from "react";
import "./UserDialogs.scss";
import {UserDialogsTypes} from "./UserDialogsContainer";

export const UserDialogs = ({isUserSearch, Users, Dialogs}: UserDialogsTypes) => {
  return <div className="dialogs">{isUserSearch ? Users : Dialogs}</div>;
};
