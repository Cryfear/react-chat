import React, { useMemo } from "react";
import { DialogItem } from "../components/Home/DialogsLIst/UserDialogs/DialogItem/DialogItem";
import { ItemTypes } from "../components/Home/DialogsLIst/UserDialogs/UserDialogsContainer";

export type unConvertedDialogsTypes = {
  avatar: string;
  fullName: string;
  _id: string;
  isOnline: boolean;
};

interface useCreatingDialogsListTypes {
  Dialogs: ItemTypes[];
  unConvertedDialogs: unConvertedDialogsTypes[];
}

export const useCreatingDialogsList = ({
  Dialogs,
  unConvertedDialogs,
}: useCreatingDialogsListTypes) => {
  return useMemo(() => {
    return Dialogs && Dialogs.length > 0 ? (
      Dialogs.map((dialog: ItemTypes, index: number) => {
        return (
          <DialogItem
            dialogId={unConvertedDialogs[index]._id}
            {...dialog}
            key={dialog.id}
          />
        );
      })
    ) : (
      <div />
    );
  }, [Dialogs, unConvertedDialogs]);
};
