import { createEffect, createStore } from "effector";
import { DialogsApi } from "../../../api/DialogsApi";
import { UsersApi } from "../../../api/UsersApi";

interface DialogsListStoreTypes {
    dialogs: Array<any>;
    users: Array<any>;
    userSearch: boolean;
}

export const DialogsLoaderFx = createEffect(async ({ id, page }: any) => {
  const res2 = await UsersApi.getUsers({ page: 0 });
  return res2.data;
});

export const UsersLoaderFx = createEffect(async ({id}: any) => {
  const res = await DialogsApi.getMyDialogs(id);
  console.log(res.data);
  return res.data;
});

export const DialogsListStore = createStore<DialogsListStoreTypes>({
  dialogs: [],
  users: [],
  userSearch: true,
})
  .on(DialogsLoaderFx.doneData, (state, data) => {
    if (data) {
      return {
        ...state,
        dialogs: data,
      };
    }
    return { ...state };
  })
  .on(UsersLoaderFx.doneData, (state, data) => {
    if (data) {
      return {
        ...state,
        users: data,
      };
    }
    return { ...state };
  });
