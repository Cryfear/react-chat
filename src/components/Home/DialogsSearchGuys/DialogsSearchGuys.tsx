import React from "react";
import DialogsRoutes from "./DialogsRoutes/DialogsRoutes";
import { DialogsSearchGuysTypes } from "../HomeTypes";

const DialogsSearchGuys = (props: DialogsSearchGuysTypes) => {
  return (
    <div className="dialogs__search-guys">
      <DialogsRoutes
        getUsers={props.getUsers}
        page={props.page}
        users={props.users}
        isSearch={props.isSearch}
      />
    </div>
  );
};

export default DialogsSearchGuys;
