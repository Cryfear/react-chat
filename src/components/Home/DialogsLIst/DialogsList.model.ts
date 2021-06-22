import {createEffect, createStore} from "effector";
import {DialogsApi} from "../../../api/DialogsApi";
import {UsersApi} from "../../../api/UsersApi";

interface DialogsListStoreTypes {
  dialogs: Array<any>;
  users: Array<any>;
  isUserSearch: boolean;
  usersSearchPage: number;
}

export const DialogsLoaderFx = createEffect(async ({id}: any) => {
  const res = await DialogsApi.getMyDialogs(id);

  const idOfOpponent = res.data.map((item: any) => {
    return item.users[0] !== id ? item.users[0] : item.users[1];
  });

  return await UsersApi.findUser(idOfOpponent);
});

export const SwitchSearch = createEffect(() => {
  return 'clicked';
});

export const UsersLoaderFx = createEffect(async (page: number) => {
  return await UsersApi.getUsers(page);
});


export const onScrollLoaderFx = createEffect(async ({e, page}: { e: any, page: number }) => {
  const target = e.currentTarget as Element;
  if ((target.scrollHeight - (target.scrollTop + window.innerHeight)) < 1) {
    return await UsersLoaderFx(page);
  }
});

export const DialogsListStore = createStore<DialogsListStoreTypes>({
  dialogs: [],
  users: [],
  isUserSearch: false,
  usersSearchPage: 0
}).on(UsersLoaderFx.doneData, (state, {data}) => {
  if (data.length > 0 && state.users.length > 0) {
    return {
      ...state,
      users: [...state.users, ...data],
      usersSearchPage: state.usersSearchPage + 1
    }
  } else if (data.length > 0) {
    return {
      ...state,
      users: data,
      usersSearchPage: state.usersSearchPage + 1
    }
  } else {
    return state;
  }
})
  .on(DialogsLoaderFx.doneData, (state, {data}) => {
    if (data) {
      return {
        ...state,
        dialogs: data,
      };
    }
    return state;
  })
  .on(SwitchSearch.doneData, (state, data) => {
    return {
      ...state,
      isUserSearch: !state.isUserSearch
    }
  })