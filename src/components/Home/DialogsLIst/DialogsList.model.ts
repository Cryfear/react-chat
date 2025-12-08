import { createEffect, createStore } from "effector";
import { DialogsApi } from "../../../api/DialogsApi";
import { UsersApi } from "../../../api/UsersApi";
import { getUsersBySearch } from "./SearchDialogs/SearchDialogs";
import { DialogsListStoreTypes } from "../Home.types";

export const createDialogFx = createEffect(async ({ id1, id2 }: { id1: string; id2: string }): Promise<any> => {
  return await DialogsApi.create({ id_1: id1, id_2: id2 });
});

export const DialogsLoaderFx = createEffect(async ({ id, page }: { id: string; page: number }) => {
  const myDialogs: any = await DialogsApi.getMyDialogs({ id, page });

  const Users = await Promise.all(
    myDialogs.data.map(async (dialog: any) => {
      return dialog.users[0] !== id ? await UsersApi.findUser(dialog.users[0]) : await UsersApi.findUser(dialog.users[1]);
    })
  );

  return {
    dialogs: Users.map((user, index) => {
      return {
        user: user.data,
        id: myDialogs.data[index]._id,
      };
    }),
    page: page,
  };
});

export const onScrollDialogsLoaderFx = createEffect(
  async ({ e, page, id }: { e: React.UIEvent<HTMLElement>; page: number; id: string }) => {
    return await DialogsLoaderFx({ id, page });
  }
);

export const $DialogsListStore = createStore<DialogsListStoreTypes>({
  initialisedDialogs: false,
  dialogs: [],
  dialogsSearchPage: 0,
})
  .on(DialogsLoaderFx.doneData, (state, { dialogs, page }: any): any => {
    if (!state.initialisedDialogs) {
      return {
        ...state,
        dialogs,
        dialogsSearchPage: state.dialogsSearchPage + 1,
        initialisedDialogs: true,
      };
    } else if (state.dialogs.length > 0 && dialogs.length > 0 && page > 0) {
      return {
        ...state,
        dialogs: [...state.dialogs, ...dialogs],
        dialogsSearchPage: state.dialogsSearchPage + 1,
      };
    } else if (dialogs.length > 0 && page > 0) {
      return {
        ...state,
        dialogs: dialogs,
        dialogsSearchPage: state.dialogsSearchPage + 1,
      };
    } else {
      return state;
    }
  })
  .on(getUsersBySearch.doneData, (state, data) => {
    if (data === "close")
      return {
        ...state,
        isUserSearch: false,
        users: [],
        initialisedUsers: false,
        usersSearchPage: 0,
      };
    return {
      ...state,
      isUserSearch: true,
      users: data.data,
    };
  });
