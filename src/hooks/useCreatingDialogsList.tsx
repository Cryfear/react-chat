import React, { useMemo } from "react";
import { DialogItem } from "../components/Home/DialogsLIst/UserDialogs/DialogItem/DialogItem";
import { DialogsPreviewType, unconvertedDialogType } from "../components/Home/Home.types";

export const useCreatingDialogsList = ({
  Dialogs,
  unConvertedDialogs
}: {
  Dialogs: DialogsPreviewType[],
  unConvertedDialogs: unconvertedDialogType[],
}) => {
  return useMemo(() => {
    return Dialogs && Dialogs.length > 0 ? (
      Dialogs.map((dialog: DialogsPreviewType, index: number) => {
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
