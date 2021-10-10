import React, { useMemo } from "react";
import { DialogItem } from "../components/Home/DialogsLIst/UserDialogs/DialogItem/DialogItem";
import { ItemTypes } from "../components/Home/DialogsLIst/UserDialogs/UserDialogsContainer";

export const useCreatingDialogsList = (dialogs: any, unConvertedDialogs: any) => {
  return useMemo(() => {
    return dialogs && dialogs.length > 0 ? (
      dialogs.map((dialog: ItemTypes, index: number) => {
        return (
          <DialogItem dialogId={unConvertedDialogs[index]._id} {...dialog} key={dialog.id} />
        );
      })
    ) : (
      <div />
    );
  }, [dialogs, unConvertedDialogs]);
};
