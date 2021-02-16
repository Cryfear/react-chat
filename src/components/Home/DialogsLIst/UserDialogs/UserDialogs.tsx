import React from "react";
import DialogItem from "./DialogItem/DialogItem";

import "./UserDialogs.scss";

const UserDialogs = () => {
  return (
    <div className="dialogs">
      <DialogItem />
      <DialogItem />
      <DialogItem />
    </div>
  );
};

export default UserDialogs;
