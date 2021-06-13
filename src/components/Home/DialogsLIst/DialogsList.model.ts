import { createEffect, createStore } from "effector";
import { DialogsApi } from "../../../api/DialogsApi";
import { UsersApi } from "../../../api/UsersApi";

export const DialogsLoaderFx = createEffect(async ({id, page}: any) => {
    const result = await DialogsApi.getMyDialogs(id, 0);
    const res2 = await UsersApi.getUsers({page: 0});
    console.log(res2.data);
    console.log(result.data);
    return result.data;
})

export const DialogsListStore = createStore({
    dialogs: false
})