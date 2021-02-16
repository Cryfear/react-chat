import React from "react";

import Header from "./Header/Header";
import SearchDialogs from "./SearchDialogs/SearchDialogs";
import UserDialogs from "./UserDialogs/UserDialogs";

import "./DialogsList.scss";

const DialogsList = () => {
  return (
    <div className="dialogs-list">
      <Header />
      <SearchDialogs />
      <UserDialogs />
    </div>
  );
};

export default DialogsList;
