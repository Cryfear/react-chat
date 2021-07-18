import { createEffect, createStore } from "effector";
import { DialogsApi } from "../../../api/DialogsApi";
import { UsersApi } from "../../../api/UsersApi";
import { UIEvent } from "react";
import { MessagesApi } from "../../../api/MessagesApi";
import { initialiseDialogFx } from "../Home.model";

interface DialogsListStoreTypes {
  dialogs: Array<any>;
  users: Array<any>;
  isUserSearch: boolean;
  usersSearchPage: number;
  dialogsSearchPage: number;
  initialisedDialogs: boolean;
  initialisedUsers: boolean;
  unConvertedDialogs: Array<any>;

  potentialDialog: {
    avatar: string;
    name: string;
    isOnline: boolean;
    id: string;
  } | null;
}

export const getLastDialogMessage = createEffect(async (dialogId: string) => {
  try {
    const lastMessage = await MessagesApi.getLastDialogMessage(dialogId);
    return {
      text: lastMessage.data.text,
      date: lastMessage.data.date,
    };
  } catch (err) {}
});

export const getUsersBySearch = createEffect(
  async (values: { page: number; searchText: string }) => {
    console.log(values.searchText)
    try {
      if (values.searchText !== "") {
        const users = await UsersApi.getUsersByName(values);
        console.log(users.data)
        return users;
      }
      else {
        return 'close';
      }
    } catch (Err) {
      return "close";
    }
  }
);

export const getUnreadedMessagesCount = createEffect(
  async ({ dialogId, userId }: any) => {
    try {
      const unreadedCount = await MessagesApi.getUnreadedMessagesCount({
        dialogId,
        userId,
      });
      return unreadedCount.data.length;
    } catch (err) {}
  }
);

export const readyToCreateDialogFx = createEffect(
  async ({ user, myId }: any) => {
    try {
      const dialog = await DialogsApi.find({ id_1: myId, id_2: user.id });
      if (dialog) {
        const lol = await initialiseDialogFx({
          userId: user.id,
          myId,
          page: 0,
        });
        console.log(lol);
        return { status: "success", user };
      }
    } catch (err) {
      return user;
    }
  }
);

export const DialogsLoaderFx = createEffect(async ({ id, page }: any) => {
  const myDialogs = await DialogsApi.getMyDialogs({ id, page });

  const Users = await Promise.all(
    myDialogs.data.map(async (dialog: any) => {
      return dialog.users[0] !== id
        ? await UsersApi.findUser(dialog.users[0])
        : await UsersApi.findUser(dialog.users[1]);
    })
  );

  return {
    data: Users.map((user: any) => user.data),
    unConvertedDialogs: myDialogs.data,
    page: page,
  };
});

export const SwitchSearch = createEffect(() => {
  return "clicked";
});

export const UsersLoaderFx = createEffect(async (page: number) => {
  const Users = await UsersApi.getUsers(page);
  return {
    data: Users.data,
    page: page,
  };
});

export const onScrollUsersLoaderFx = createEffect(
  async ({ e, page }: { e: UIEvent<HTMLDivElement>; page: number }) => {
    const target = e.currentTarget as Element;
    if (target.scrollHeight - (target.scrollTop + window.innerHeight) < 1) {
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
    e: UIEvent<HTMLDivElement>;
    page: number;
    id: string;
  }) => {
    const target = e.target as Element;
    if (target.scrollHeight - (target.scrollTop + window.innerHeight) < 1) {
      return await DialogsLoaderFx({ id, page });
    }
  }
);

export const createDialogFx = createEffect(
  async ({ id1, id2 }: { id1: string; id2: string }) => {
    return await DialogsApi.create({ id_1: id1, id_2: id2 });
  }
);

export const DialogsListStore = createStore<DialogsListStoreTypes>({
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
  .on(
    DialogsLoaderFx.doneData,
    (state, { data, page, unConvertedDialogs }: any) => {
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
    }
  )
  .on(SwitchSearch.doneData, (state, data) => {
    return {
      ...state,
      isUserSearch: !state.isUserSearch,
    };
  })
  .on(createDialogFx.doneData, (state, { data }) => {
    console.log(data);
    return {
      ...state,
      isUserSearch: !state.isUserSearch,
    };
  })
  .on(readyToCreateDialogFx.doneData, (state, data) => {
    return {
      ...state,
      potentialDialog: {
        avatar: data.avatar,
        name: data.fullName,
        isOnline: data.isOnline,
        id: data.id,
      },
    };
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
