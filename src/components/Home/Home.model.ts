import { getUsersBySearch } from "./DialogsLIst/SearchDialogs/SearchDialogs";
import { createEffect, createStore } from "effector";
import { DialogsApi } from "../../api/DialogsApi";
import { MessagesApi } from "../../api/MessagesApi";
import { UsersApi } from "../../api/UsersApi";
import {
  readyToCreateDialogFx,
  SwitchSearch,
} from "./DialogsLIst/DialogsList.model";
import { sendMessageFx } from "./Dialog/Content/Content.model";

interface HomeStoreTypes {
  isInitialisedDialog: boolean;
  currentUser: {
    name: string;
    id: string;
    avatar: string;
    isOnline: boolean;
  } | null;
  currentDialog: {
    id: string;
    isTyping: boolean;
    page: number;
    unreadedPage: number;
    opponentId: string;
  };
  loadedDialog: boolean;
  currentDialogMessages: any[];
  messageSent: boolean;
}

export const setUnreadMessagesFx = createEffect(
  async ({ dialogId, userId }: any) => {
    const unreadedMessages = await MessagesApi.getUnreadedMessagesWithData({
      dialogId,
      unreadedPage: 0,
      userId,
    });

    return { messages: unreadedMessages.data.reverse() };
  }
);

export const initialiseDialogFx = createEffect(
  async ({
    userId,
    myId,
    page,
  }: {
    userId: string;
    myId: string;
    page: number;
  }) => {
    const dialog = await DialogsApi.find({ id_1: userId, id_2: myId });
    const user = await UsersApi.findUser(userId);
    const messages = await MessagesApi.getDialogMessages({
      dialogId: dialog.data._id,
      page: 0,
      myId,
    });

    return {
      name: user.data.fullName,
      userId: user.data.id,
      avatar: user.data.avatar,
      isOnline: user.data.isOnline,

      currentDialogID: dialog.data._id,
      currentDialogTyping: dialog.data.isTyping,
      currentDialogMessages: messages.data,
      currentDialogPage: page,
      currentDialogOpponentId:
        dialog.data.users[0] === myId
          ? dialog.data.users[1]
          : dialog.data.users[0],
    };
  }
);

const onScrollUnreadedMessagesLoader = createEffect(
  async ({ dialogId, unreadedPage, userId }: any) => {
    const mes = await MessagesApi.getUnreadedMessagesWithData({
      dialogId,
      unreadedPage,
      userId,
    });

    return {
      messages: mes.data.reverse(),
      unreadedPage,
    };
  }
);

export const onScrollLoaderMessages = createEffect(
  async ({ ref, page, dialogId, unreadedPage, myId, userId }: any) => {
    const scrollHeight = ref.current.scrollHeight;
    const scrollTop = ref.current.scrollTop;

    if (
      scrollHeight + scrollTop <
      window.innerHeight - (window.innerHeight / 100) * 5
    ) {
      const mes = await MessagesApi.getDialogMessages({ dialogId, page, myId });
      return {
        messages: mes.data,
        page: page,
      };
    } else if (scrollTop < 100) {
      onScrollUnreadedMessagesLoader({ dialogId, unreadedPage, userId });
    }
  }
);

export const socketGetMessage = createEffect((msg: any) => {
  console.log(msg);
  return {
    dialogId: msg.content.dialog._id,
    messageCreater: msg.content.creater,
    messageOpponent: msg.to,
    messageDate: msg.content.date,
    message: msg.content,
    isReaded: msg.content.isReaded,
    messageId: msg.content._id,
  };
});

export const messageSentSwitcher = createEffect(() => true);

export const HomeStore = createStore<HomeStoreTypes>({
  isInitialisedDialog: false, // отвечает за инициализацию списка диалогов
  loadedDialog: false, // отвечает за инициализацию выбранного диалога
  currentUser: null,
  currentDialog: {
    id: "",
    isTyping: false,
    page: 0,
    unreadedPage: 0,
    opponentId: "",
  },
  currentDialogMessages: [],
  messageSent: false, // флаг для отправки сообщения, чтобы проскролить вниз когда станет true
})
  .on(initialiseDialogFx.doneData, (state, data) => {
    if (data) {
      return {
        loadedDialog: false,
        messageSent: false,
        currentUser: {
          name: data.name,
          id: data.userId,
          avatar: data.avatar,
          isOnline: data.isOnline,
        },
        currentDialog: {
          id: data.currentDialogID,
          isTyping: data.currentDialogTyping,
          page: 1,
          unreadedPage: 0,
          opponentId: data.currentDialogOpponentId,
        },
        currentDialogMessages: data.currentDialogMessages,
        isInitialisedDialog: true,
      };
    }
    return state;
  })
  .on(sendMessageFx.doneData, (state, data) => {
    return {
      ...state,
      currentDialogMessages: [data, ...state.currentDialogMessages],
    };
  })
  .on(onScrollLoaderMessages.doneData, (state, data) => {
    if (data && data.messages) {
      if (!state.loadedDialog) {
        return {
          ...state,
          currentDialogMessages: [
            ...state.currentDialogMessages,
            ...data.messages,
          ],
          currentDialog: {
            ...state.currentDialog,
            page: state.currentDialog.page + 1,
          },
          loadedDialog: true,
        };
      } else if (data.page !== state.currentDialog.page) {
        return state;
      } else if (
        state.currentDialogMessages.length > 0 &&
        data.messages.length > 0 &&
        data.page > 0
      ) {
        return {
          ...state,
          currentDialogMessages: [
            ...state.currentDialogMessages,
            ...data.messages,
          ],
          currentDialog: {
            ...state.currentDialog,
            page: state.currentDialog.page + 1,
          },
        };
      } else if (data.messages.length > 0 && data.page > 0) {
        return {
          ...state,
          currentDialogMessages: [
            ...state.currentDialogMessages,
            ...data.messages,
          ],
          currentDialog: {
            ...state.currentDialog,
            page: state.currentDialog.page + 1,
          },
        };
      } else {
        return state;
      }
    } else {
      return state;
    }
  })
  .on(readyToCreateDialogFx.doneData, (state, data) => {
    if (data.status === "success") {
      return {
        ...state,
        currentDialog: {
          ...state.currentDialog,
          page: 0,
        },
        loadedDialog: false,
      };
    }
    return {
      ...state,
      isInitialisedDialog: false,
      loadedDialog: false,
      currentUser: null,
      currentDialog: {
        id: "",
        isTyping: false,
        page: 0,
        unreadedPage: 0,
        opponentId: "",
      },
      currentDialogMessages: [],
    };
  })
  .on(SwitchSearch.doneData, (state, _) => {
    return {
      ...state,
    };
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
    console.log(data);
    if (state.currentDialog.id === data.dialogId) {
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
  .on(onScrollUnreadedMessagesLoader.doneData, (state, data) => {
    if (data && data.messages) {
      if (!state.loadedDialog) {
        return {
          ...state,
          currentDialogMessages: [
            ...data.messages,
            ...state.currentDialogMessages,
          ],
          currentDialog: {
            ...state.currentDialog,
            unreadedPage: state.currentDialog.unreadedPage + 1,
          },
          loadedDialog: true,
        };
      } else if (data.unreadedPage !== state.currentDialog.unreadedPage) {
        return state;
      } else if (
        state.currentDialogMessages.length > 0 &&
        data.messages.length > 0 &&
        data.unreadedPage > 0
      ) {
        return {
          ...state,
          currentDialogMessages: [
            ...data.messages,
            ...state.currentDialogMessages,
          ],
          currentDialog: {
            ...state.currentDialog,
            unreadedPage: state.currentDialog.unreadedPage + 1,
          },
        };
      } else if (data.messages.length > 0 && data.unreadedPage > 0) {
        return {
          ...state,
          currentDialogMessages: [
            data.messages,
            ...state.currentDialogMessages,
          ],
          currentDialog: {
            ...state.currentDialog,
            unreadedPage: state.currentDialog.unreadedPage + 1,
          },
        };
      } else {
        return state;
      }
    } else {
      return state;
    }
  })
  .on(setUnreadMessagesFx.doneData, (state, data) => {
    if (data) {
      return {
        ...state,
        currentDialogMessages: [
          ...data.messages,
          ...state.currentDialogMessages,
        ],
        currentDialog: {
          ...state.currentDialog,
          unreadedPage: state.currentDialog.unreadedPage + 1,
        },
      };
    }
    return state;
  });
