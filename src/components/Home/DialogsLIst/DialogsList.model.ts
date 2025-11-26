import { createEffect, createStore } from "effector";
import { DialogsApi } from "../../../api/DialogsApi";
import { UsersApi } from "../../../api/UsersApi";
import { initialiseDialogFx } from "../Home.model";
import { getUsersBySearch } from "./SearchDialogs/SearchDialogs";
import { DialogsListStoreTypes, usersType } from "../Home.types";

export const createDialogFx = createEffect(
  async ({ id1, id2 }: { id1: string; id2: string }): Promise<any> => {
    return await DialogsApi.create({ id_1: id1, id_2: id2 });
  }
);

export const readyToCreateDialogFx = createEffect(
  async ({ user, myId }: { user: usersType; myId: string }) => {
    const dialog = await DialogsApi.find({ id_1: myId, id_2: user.id });

    if (dialog.data) {
      await initialiseDialogFx({
        userId: user.id,
        myId: myId,
        page: 0,
      });
      return { status: "success", user };
    }
  }
);

export const DialogsLoaderFx = createEffect(
  async ({ id, page }: { id: string; page: number }) => {
    const myDialogs: any = await DialogsApi.getMyDialogs({ id, page });

    const Users = await Promise.all(
      myDialogs.data.map(async (dialog: any) => {
        return dialog.users[0] !== id
          ? await UsersApi.findUser(dialog.users[0])
          : await UsersApi.findUser(dialog.users[1]);
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
  }
);

export const UsersLoaderFx = createEffect(async (page: number) => {
  const Users = await UsersApi.getUsers({ page });
  return {
    data: Users.data,
    page: page,
  };
});

export const onScrollUsersLoaderFx = createEffect(
  async ({ e, page }: { e: React.UIEvent<HTMLElement>; page: number }) => {
    if (
      e.currentTarget.scrollHeight -
        (e.currentTarget.scrollTop + window.innerHeight) <
      1
    ) {
      return await UsersLoaderFx(page);
    }
  }
);

export const onScrollDialogsLoaderFx = createEffect(
  async ({
    e,
    page,
    id,
  }: {
    e: React.UIEvent<HTMLElement>;
    page: number;
    id: string;
  }) => {
    if (
      e.currentTarget.scrollHeight -
        (e.currentTarget.scrollTop + window.innerHeight) <
      1
    ) {
      return await DialogsLoaderFx({ id, page });
    }
  }
);

export const $DialogsListStore = createStore<DialogsListStoreTypes>({
  initialisedDialogs: false,
  initialisedUsers: false,
  dialogs: [],
  users: [],
  isUserSearch: false,
  usersSearchPage: 0,
  dialogsSearchPage: 0,
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
  .on(createDialogFx.doneData, (state, { data }) => {
    if (data) {
      return {
        ...state,
        isUserSearch: !state.isUserSearch,
      };
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
