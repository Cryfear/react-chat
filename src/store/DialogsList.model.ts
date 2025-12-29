import { createEffect, createStore } from "effector";
import { DialogsApi } from "@api/DialogsApi";
import { DialogsListStoreTypes, IDialog } from "@/types/Home.types";

export const createDialogFx = createEffect(async ({ id1, id2 }: { id1: string; id2: string }) => {
  return await DialogsApi.create({ id_1: id1, id_2: id2 });
});

export const loadInitialDialogsFx = createEffect<{ id: string }, { dialogs: DialogsListStoreTypes["dialogs"] }>(async ({ id }) => {
  const response = await DialogsApi.getMyDialogs({ id, page: 0 });

  return { dialogs: response.data };
});

export const loadMoreDialogsFx = createEffect<{ id: string; page: number }, { dialogs: IDialog[] }>(async ({ id, page }) => {
  const { data } = await DialogsApi.getMyDialogs({ id, page });

  return { dialogs: data };
});

export const $DialogsListStore = createStore<DialogsListStoreTypes>({
  initialisedDialogs: false,
  dialogs: [],
  dialogsSearchPage: 0,
})
  .on(loadInitialDialogsFx.doneData, (_, { dialogs }) => ({ dialogs, dialogsSearchPage: 1, initialisedDialogs: true }))
  .on(loadMoreDialogsFx.doneData, (state, { dialogs }) => {
    console.log(dialogs);
    return {
      ...state,
      dialogs: [...state.dialogs, ...dialogs],
      dialogsSearchPage: state.dialogsSearchPage + 1,
    };
  });
