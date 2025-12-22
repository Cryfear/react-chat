import { createEffect, createEvent, createStore } from "effector";
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

export const getUsersBySearch = createEffect(async (values: any) => {
  try {
    if (values.searchText !== "") {
      return await UsersApi.getUsersByName(values);
    } else {
      return "close";
    }
  } catch (_) {
    return "close";
  }
});

export const $isUserSearch = createStore(false);
export const changeUserSearch = createEvent<boolean>();

// sample({
//   clock: changeUserSearch,
//   target: $isUserSearch,
//   fn: (state) => state
// })

$isUserSearch.on(changeUserSearch, (state, data) => data);

export const $UsersListStore = createStore<UsersListStoreTypes>({
  initialisedUsers: false,
  users: [],
  usersSearchPage: 0,
})
  .on(getUsersBySearch.doneData, (state, data) => {
    if (data === "close") {
      return {
        ...state,
        isUserSearch: false,
        users: [],
        initialisedUsers: false,
        usersSearchPage: 0,
      };
    }

    return {
      ...state,
      isUserSearch: true,
      users: data.data,
    };
  })
  .on(UsersLoaderFx.doneData, (state, { data, page }) => {
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
