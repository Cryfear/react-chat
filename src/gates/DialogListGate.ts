import { loadInitialDialogsFx } from "@/store/DialogsList.model";
import { sample } from "effector";
import { createGate } from "effector-react";

export const DialogsListGate = createGate<string>();

sample({
  clock: DialogsListGate.open,
  fn: (id) => ({ id, page: 0 }),
  target: loadInitialDialogsFx,
});

export const $isDialogsLoading = loadInitialDialogsFx.pending;
