import { createEffect, createStore } from "effector";
import { UsersListStoreTypes } from "@/types/Home.types";
import { UsersApi } from "@/api/UsersApi";

export const UsersLoaderFx = createEffect(async (page: number) => {
  const Users = await UsersApi.getUsers({ page });
  return {
    data: Users.data,
    page: page,
  };
});

export const onScrollUsersLoaderFx = createEffect(async ({ e, page }: { e: React.UIEvent<HTMLElement>; page: number }) => {
  return await UsersLoaderFx(page);
});

export const $UsersListStore = createStore<UsersListStoreTypes>({
  initialisedUsers: false,
  users: [],
  usersSearchPage: 0,
}).on(UsersLoaderFx.doneData, (state, { data, page }) => {
  if (!state.initialisedUsers) {
    return {
      ...state,
      users: data,
      usersSearchPage: state.usersSearchPage + 1,
      initialisedUsers: true,
    };
  } else if (page !== state.usersSearchPage) {
    return state;
  } else if (state.users.length > 0 && data.length > 0 && page > 0) {
    return {
      ...state,
      users: [...state.users, ...data],
      usersSearchPage: state.usersSearchPage + 1,
    };
  } else if (data.length > 0 && page > 0) {
    return {
      ...state,
      users: data,
      usersSearchPage: state.usersSearchPage + 1,
    };
  } else {
    return state;
  }
});
