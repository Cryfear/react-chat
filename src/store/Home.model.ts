import { getUsersBySearch } from "@components/Home/DialogsList/SearchDialogs/SearchDialogs";
import { createEffect, createEvent, createStore, sample } from "effector";
import { DialogsApi } from "@api/DialogsApi";
import { MessagesApi } from "@api/MessagesApi";
import { UsersApi } from "@api/UsersApi";
import { sendMessageFx } from "./Content.model";
import {
  dialogPromiseType,
  HomeStoreTypes,
  initDialogTypes,
  initialiseDialogFxTypes,
  MessageType,
  onScrollLoaderMessagesTypes,
  unreadMesssagesFxTypes,
  usersType,
} from "../types/Home.types";
import { socketGetMessage } from "../socket";

export const $HomeStore = createStore<HomeStoreTypes>({
  isInitialisedDialog: false, // отвечает за инициализацию списка диалогов
  loadedDialog: false, // отвечает за инициализацию выбранного диалога, то есть первоначальная загрузка
  isDialogFullLoaded: false, // долистали ли мы до конца сообщений, чтобы не отправлять лишние запросы
  currentUser: null, // это собеседник
  currentDialog: {
    // текущий диалог
    id: "", // dialogId
    isTyping: false, // печатает ли нам собеседник
    page: 0, // страница сообщений
    unreadedPage: 0, // непрочитанные сообщения если есть больше десятка
  },
  currentDialogMessages: [],
  messageSent: false, // флаг для отправки сообщения, чтобы проскролить вниз когда станет true
});

const clearMessages = createEvent();

export const readyToCreateDialogFx = createEffect(async ({ user, myId }: { user: usersType; myId: string }) => {
  try {
    const dialog = await DialogsApi.find({ id_1: myId, id_2: user.id });

    if (dialog.data) {
      await initialiseDialogFx({
        userId: user.id,
        myId: myId,
        page: 0,
      });
      return { status: "success", user };
    } else {
      clearMessages();
      return { status: "potencial", user };
    }
  } catch (error) {
    clearMessages();
    return { status: "error", user };
  }
});

export const dialogLoaded = createEvent();
// нужен, когда мы находимся уже на урле диалога, чтобы зафиксировать и отреагировать на загрузку этого диалога

export const loadDialogFx = createEffect(async (id: string): Promise<void> => {
  try {
    const user = await UsersApi.findUser(id);
    await readyToCreateDialogFx({ myId: sessionStorage["id"], user: user.data });
    dialogLoaded();
  } catch (error) {
    console.error("Error loading dialog:", error);
  }
});

sample({
  clock: dialogLoaded,
  source: $HomeStore,
  fn: (state) => ({
    ...state,
    currentDialog: {
      ...state.currentDialog,
      page: 1,
    },
  }),
  target: $HomeStore,
});

export const setUnreadMessagesFx = createEffect(async ({ dialogId, userId }: unreadMesssagesFxTypes) => {
  const unreadedMessages = await MessagesApi.getUnreadedMessagesWithData({
    dialogId,
    unreadedPage: 0,
    userId,
  });

  return { messages: unreadedMessages.data };
});

export const initialiseDialogFx = createEffect(async ({ userId, myId, page }: initDialogTypes) => {
  const dialog: dialogPromiseType = await DialogsApi.find({
    id_1: userId,
    id_2: myId,
  });
  const user = await UsersApi.findUser(userId);
  const messages = await MessagesApi.getDialogMessages({
    dialogId: dialog.data._id,
    page: 0,
    myId,
  });

  return {
    fullName: user.data.fullName,
    userId: user.data.id,
    avatar: user.data.avatar,
    isOnline: user.data.isOnline,

    currentDialogID: dialog.data._id,
    currentDialogTyping: dialog.data.isTyping,
    currentDialogMessages: messages.data,
    currentDialogPage: page,
    currentDialogOpponentId: dialog.data.users[0] === myId ? dialog.data.users[1] : dialog.data.users[0],
  };
});

export const onScrollLoaderMessages = createEffect(async ({ page, dialogId, myId }: onScrollLoaderMessagesTypes) => {
  try {
    const mes = await MessagesApi.getDialogMessages({
      dialogId,
      page,
      myId,
    });

    if (mes.data.length === 0) {
      return { responseCode: "dialog end" };
    }

    return {
      messages: mes.data,
      page: page,
    };
  } catch (error) {
    console.error("Error loading messages:", error);
    return null;
  }
});

export const messageSentSwitcher = createEffect(() => true);

$HomeStore
  .on(clearMessages, (state) => {
    return {
      ...state,
      currentDialogMessages: [],
    };
  })
  .on(readyToCreateDialogFx.doneData, (state, data) => {
    return {
      ...state,
      currentUser: {
        ...data.user,
      },
    };
  })
  .on(initialiseDialogFx.doneData, (state, data: initialiseDialogFxTypes) => {
    if (!data) return state;

    return {
      ...state,
      loadedDialog: true,
      messageSent: false,
      currentUser: {
        fullName: data.fullName,
        id: data.userId,
        avatar: data.avatar,
        isOnline: data.isOnline,
      },
      currentDialog: {
        id: data.currentDialogID,
        isTyping: data.currentDialogTyping,
        page: 1, // Начинаем с page 1
        unreadedPage: 0,
        opponentId: data.currentDialogOpponentId,
      },
      currentDialogMessages: data.currentDialogMessages,
      isInitialisedDialog: true,
      isDialogFullLoaded: false, // Сбрасываем при инициализации нового диалога
    };
  })
  .on(sendMessageFx.doneData, (state, data) => {
    return {
      ...state,
      currentDialogMessages: [data, ...state.currentDialogMessages],
    };
  })
  .on(onScrollLoaderMessages.doneData, (state, data) => {
    if (!data) return state;

    if (data.responseCode === "dialog end") {
      return { ...state, isDialogFullLoaded: true };
    }

    if (data.messages && data.messages.length > 0) {
      const existingIds = new Set(state.currentDialogMessages.map((msg: MessageType) => msg._id));
      const newMessages = data.messages.filter((msg: MessageType) => !existingIds.has(msg._id));

      if (newMessages.length === 0) {
        return state;
      }

      return {
        ...state,
        currentDialogMessages: [...state.currentDialogMessages, ...newMessages],
        currentDialog: {
          ...state.currentDialog,
          page: state.currentDialog.page + 1,
        },
        loadedDialog: true,
      };
    }

    return state;
  })
  .on(getUsersBySearch.doneData, (state, data) => {
    if (data === "close")
      return {
        ...state,
        currentDialog: {
          ...state.currentDialog,
          page: 0,
        },
        loadedDialog: false,
      };
    return {
      ...state,
      currentDialog: {
        ...state.currentDialog,
        page: 0,
      },
      loadedDialog: false,
    };
  })
  .on(socketGetMessage.doneData, (state, data) => {
    if (data && state.currentDialog.id === data.dialogId) {
      return {
        ...state,
        currentDialogMessages: [data.message, ...state.currentDialogMessages],
      };
    }
    return state;
  })
  .on(messageSentSwitcher.doneData, (state, _) => {
    return {
      ...state,
      messageSent: !state.messageSent,
    };
  })
  .on(setUnreadMessagesFx.doneData, (state, data) => {
    if (data) {
      return {
        ...state,
        currentDialogMessages: [...data.messages, ...state.currentDialogMessages],
        currentDialog: {
          ...state.currentDialog,
          unreadedPage: state.currentDialog.unreadedPage + 1,
        },
      };
    }
    return state;
  });
