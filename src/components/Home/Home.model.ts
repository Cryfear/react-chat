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
import {
  dialogPromiseType,
  HomeStoreTypes,
  initDialogTypes,
  initialiseDialogFxTypes, messageType,
  onScrollLoaderMessagesTypes,
  unreadMesssagesFxTypes
} from "./Home.types";

export const socketGetMessage = createEffect((msg: messageType) => {
  if (msg) {
    return {
      dialogId: msg.content.dialog._id,
      messageCreater: msg,
      messageOpponent: msg.to,
      messageDate: msg.content.date,
      message: msg.content,
      isReaded: msg.content.isReaded,
      messageId: msg.content._id,
    };
  }
});

export const setUnreadMessagesFx = createEffect(
  async ({ dialogId, userId }: unreadMesssagesFxTypes) => {
    const unreadedMessages = await MessagesApi.getUnreadedMessagesWithData({
      dialogId,
      unreadedPage: 0,
      userId,
    });

    return { messages: unreadedMessages.data };
  }
);

export const initialiseDialogFx = createEffect(
  async ({
    userId,
    myId,
    page,
  }: initDialogTypes) => {
    const dialog: dialogPromiseType = await DialogsApi.find({ id_1: userId, id_2: myId });
    const user = await UsersApi.findUser(userId);
    const messages = await MessagesApi.getDialogMessages({
      dialogId: dialog.data._id,
      page: 0,
      myId
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

export const onScrollLoaderMessages = createEffect(
  async ({ ref, page, dialogId, myId, isDialogFullLoaded }: onScrollLoaderMessagesTypes) => {
    if (isDialogFullLoaded) return false;
    if (ref.current) {
      const scrollHeight = ref.current.scrollHeight;
      const scrollTop = ref.current.scrollTop;

      if (
        scrollHeight + scrollTop <
        window.innerHeight - (window.innerHeight / 100) * 4
      ) {
        const mes = await MessagesApi.getDialogMessages({ dialogId, page, myId });
        if (mes.data.length === 0) {
          return { responseCode: 'dialog end, there no messages up' };
        }
        return {
          messages: mes.data,
          page: page,
        };
      }
    }
  }
);

export const messageSentSwitcher = createEffect(() => true);

export const $HomeStore = createStore<HomeStoreTypes>({
  isInitialisedDialog: false, // отвечает за инициализацию списка диалогов
  loadedDialog: false, // отвечает за инициализацию выбранного диалога, то есть первоначальная загрузка
  isDialogFullLoaded: false, // долистали ли мы до конца сообщений, чтобы не отправлять лишние запросы
  currentUser: null,  // это собеседник
  currentDialog: {  // текущий диалог
    id: "",
    isTyping: false, // печатает ли нам собеседник
    page: 0,
    unreadedPage: 0
  },
  currentDialogMessages: [],
  messageSent: false, // флаг для отправки сообщения, чтобы проскролить вниз когда станет true
})
  .on(initialiseDialogFx.doneData, (state, data: initialiseDialogFxTypes): any => {
    if (data) {
      return {
        loadedDialog: false, // открыт ли диалог сейчас
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
  .on(sendMessageFx.doneData, (state, data): any => {
    return {
      ...state,
      currentDialogMessages: [data, ...state.currentDialogMessages],
    };
  })
  .on(onScrollLoaderMessages.doneData, (state, data): any => {
    if (data && data.responseCode === 'dialog end, there no messages up') { return { ...state, isDialogFullLoaded: true } }
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
  .on(readyToCreateDialogFx.doneData, (state, data: { status: string, user: any }): any => {
    if (data?.status === "success") {
      return {
        ...state,
        currentDialog: {
          ...state.currentDialog,
          page: 0,
        },
        loadedDialog: false,
        currentUser: {
          name: data.user.fullName,
          id: data.user.id,
          avatar: data.user.avatar,
          isOnline: data.user.isOnline,
        }
      };
    }
    else {
      return {
        ...state,
        currentUser: {
          name: data.user.fullName,
          id: data.user.id,
          avatar: data.user.avatar,
          isOnline: data.user.inOnline,
        }
      }
    }
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
  .on(socketGetMessage.doneData, (state, data): any => {
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
  .on(setUnreadMessagesFx.doneData, (state, data): any => {
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