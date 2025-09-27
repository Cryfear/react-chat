import { createEffect, createStore } from "effector";
import { DialogsApi } from "../../../api/DialogsApi";
import { UsersApi } from "../../../api/UsersApi";
import { initialiseDialogFx } from "../Home.model";
import { getUsersBySearch } from "./SearchDialogs/SearchDialogs";
import { DialogsListStoreTypes, usersType } from "../Home.types";

export const createDialogFx = createEffect(async ({ id1, id2 }: { id1: string, id2: string }): Promise<any> => {
  return await DialogsApi.create({ id_1: id1, id_2: id2 });
});

export const SwitchSearch = createEffect(() => {
  return "clicked";
});

export const readyToCreateDialogFx = createEffect(async ({ user, myId }: {
  user: usersType,
  myId: string
}) => {
  const dialog = await DialogsApi.find({ id_1: myId, id_2: user.id });

  if (dialog.data) {
    await initialiseDialogFx({
      userId: user.id,
      myId: myId,
      page: 0,
    });
    return { status: "success", user };
  } else {
    return { status: "potentical", user };
  }
});

export const DialogsLoaderFx = createEffect(async ({ id, page }: { id: string, page: number }) => {
  const myDialogs = await DialogsApi.getMyDialogs({ id, page });

  const Users = await Promise.all(
    myDialogs.data.map(async (dialog: any) => {
      return dialog.users[0] !== id
        ? await UsersApi.findUser(dialog.users[0])
        : await UsersApi.findUser(dialog.users[1]);
    })
  );

  return {
    data: Users.map(user => user.data),
    unConvertedDialogs: myDialogs.data,
    page: page,
  };
});

export const UsersLoaderFx = createEffect(async (page: number) => {
  const Users = await UsersApi.getUsers({ page });
  return {
    data: Users.data,
    page: page,
  };
});

export const onScrollUsersLoaderFx = createEffect(async ({ e, page }: {
  e: React.UIEvent<HTMLElement>,
  page: number
}) => {
  if (e.currentTarget.scrollHeight - (e.currentTarget.scrollTop + window.innerHeight) < 1) {
    return await UsersLoaderFx(page);
  }
});

export const onScrollDialogsLoaderFx = createEffect(async ({ e, page, id }: {
  e: React.UIEvent<HTMLElement>,
  page: number,
  id: string
}) => {
  if (e.currentTarget.scrollHeight - (e.currentTarget.scrollTop + window.innerHeight) < 1) {
    return await DialogsLoaderFx({ id, page });
  }
});

export const $DialogsListStore = createStore<DialogsListStoreTypes>({
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
  .on(DialogsLoaderFx.doneData, (state, { data, page, unConvertedDialogs }): any => {
    if (!state.initialisedDialogs) {
      return { // here s a problem, very unflexible redux type code, no way
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
  .on(SwitchSearch.doneData, (state) => {
    return {
      ...state,
      isUserSearch: !state.isUserSearch,
    };
  })
  .on(createDialogFx.doneData, (state, { data }) => {
    if (data) {
      return {
        ...state,
        isUserSearch: !state.isUserSearch,
      };
    }
  })
  .on(readyToCreateDialogFx.doneData, (state, data: {
    user: {
      avatar: string,
      fullName: string,
      isOnline: boolean,
      id: string
    },
    status: string
  }): any => {
    if (data && data?.status === "potentical") {
      console.log('we must be here');
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
