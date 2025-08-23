import { createEffect, createStore } from "effector";
import { DialogsApi } from "../../../api/DialogsApi";
import { UsersApi } from "../../../api/UsersApi";
import { initialiseDialogFx } from "../Home.model";
import { getUsersBySearch } from "./SearchDialogs/SearchDialogs";

export const createDialogFx = createEffect(async (id1, id2) => {
  return await DialogsApi.create({ id_1: id1, id_2: id2 });
});

export const SwitchSearch = createEffect(() => {
  return "clicked";
});

export const readyToCreateDialogFx = createEffect(async ({ user, myId }) => {
  const dialog = await DialogsApi.find({ id_1: myId, id_2: user.id });

  if (dialog) {
    await initialiseDialogFx({
      userId: user.id,
      myId,
      page: 0,
    });
    return { status: "founded" };
  } else {
    return { status: "potentical", user };
  }
});

export const DialogsLoaderFx = createEffect(async ({ id, page }) => {
  const myDialogs = await DialogsApi.getMyDialogs({ id, page });

  const Users = await Promise.all(
    myDialogs.data.map(async (dialog) => {
      return dialog.users[0] !== id
        ? await UsersApi.findUser(dialog.users[0])
        : await UsersApi.findUser(dialog.users[1]);
    })
  );

  return {
    data: Users.map((user) => user.data),
    unConvertedDialogs: myDialogs.data,
    page: page,
  };
});

export const UsersLoaderFx = createEffect(async (page) => {
  const Users = await UsersApi.getUsers({ page });
  return {
    data: Users.data,
    page: page,
  };
});

export const onScrollUsersLoaderFx = createEffect(async ({ e, page }) => {
  const target = e.currentTarget;
  if (target.scrollHeight - (target.scrollTop + window.innerHeight) < 1) {
    return await UsersLoaderFx(page);
  }
});

export const onScrollDialogsLoaderFx = createEffect(async ({ e, page, id }) => {
  const target = e.target;
  if (target.scrollHeight - (target.scrollTop + window.innerHeight) < 1) {
    return await DialogsLoaderFx({ id, page });
  }
});

export const DialogsListStore = createStore({
  initialisedDialogs: false,
  initialisedUsers: false,
  dialogs: [], // уже готовые сконвертированные диалоги для DialogItem
  unConvertedDialogs: [], // несконвертированные диалоги
  users: [],
  isUserSearch: false,
  usersSearchPage: 0,
  dialogsSearchPage: 0,

  potentialDialog: null,
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
  })
  .on(DialogsLoaderFx.doneData, (state, { data, page, unConvertedDialogs }) => {
    if (!state.initialisedDialogs) {
      return {
        ...state,
        dialogs: data,
        unConvertedDialogs: unConvertedDialogs,
        dialogsSearchPage: state.dialogsSearchPage + 1,
        initialisedDialogs: true,
      };
    } else if (state.dialogs.length > 0 && data.length > 0 && page > 0) {
      return {
        ...state,
        dialogs: [...state.dialogs, ...data],
        unConvertedDialogs: [
          ...state.unConvertedDialogs,
          ...unConvertedDialogs,
        ],
        dialogsSearchPage: state.dialogsSearchPage + 1,
      };
    } else if (data.length > 0 && page > 0) {
      return {
        ...state,
        dialogs: data,
        unConvertedDialogs: unConvertedDialogs,
        dialogsSearchPage: state.dialogsSearchPage + 1,
      };
    } else {
      return state;
    }
  })
  .on(SwitchSearch.doneData, (state, data) => {
    return {
      ...state,
      isUserSearch: !state.isUserSearch,
    };
  })
  .on(createDialogFx.doneData, (state, { data }) => {
    console.log(data);
    if (data) {
      return {
        ...state,
        isUserSearch: !state.isUserSearch,
      };
    }
  })
  .on(readyToCreateDialogFx.doneData, (state, data) => {
    if (data && data?.status === "potentical") {
      return {
        ...state,
        potentialDialog: {
          avatar: data.user.avatar,
          name: data.user.fullName,
          isOnline: data.user.isOnline,
          id: data.user.id,
        },
      };
    }
    return state;
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
