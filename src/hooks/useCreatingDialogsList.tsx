import React from "react";
import { DialogItem } from "../components/Home/DialogsLIst/UserDialogs/DialogItem/DialogItem";
import { DialogsPreviewType } from "../components/Home/Home.types";

export const useCreatingDialogsList = (dialogs: DialogsPreviewType[]) => {
  return dialogs && dialogs.length > 0 ? (
    dialogs.map((dialog) => {
      return (
        <DialogItem dialogId={dialog.id} {...dialog.user} key={dialog.id} />
      );
    })
  ) : (
    <div />
  );
};
