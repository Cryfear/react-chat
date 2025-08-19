import React, { useMemo } from "react";
import { DialogItem } from "../components/Home/DialogsLIst/UserDialogs/DialogItem/DialogItem";

export const useCreatingDialogsList = ({
  Dialogs,
  unConvertedDialogs,
}) => {
  return useMemo(() => {
    return Dialogs && Dialogs.length > 0 ? (
      Dialogs.map((dialog, index) => {
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
