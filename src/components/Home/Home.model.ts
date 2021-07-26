import { createEffect, createStore } from "effector";
import { DialogsApi } from "../../api/DialogsApi";
import { MessagesApi } from "../../api/MessagesApi";
import { UsersApi } from "../../api/UsersApi";
import { socket } from "../../socket";
import {
  createDialogFx,
  getUsersBySearch,
  readyToCreateDialogFx,
  SwitchSearch,
} from "./DialogsLIst/DialogsList.model";

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
  };
  loadedDialog: boolean;
  currentDialogMessages: any[];
}

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
    };
  }
);

export const onScrollLoaderMessages = createEffect(
  async ({ e, page, dialogId }: any) => {
    const target = e.target as Element;
    console.log(target.scrollHeight, target.scrollTop, window.innerHeight);
    console.log(target.scrollHeight - (target.scrollTop + window.innerHeight));
    if (target.scrollHeight - (target.scrollTop + window.innerHeight) > 400) {
      console.log("here");
      const mes = await MessagesApi.getDialogMessages({ dialogId, page });
      return {
        messages: mes.data,
        page: page,
      };
    }
  }
);

export const sendMessageFx = createEffect(
  async ({ dialogId, userId, myId, data }: any) => {
    if (dialogId) {
      const message = await MessagesApi.create({ dialogId, myId, data });

      socket.emit("qqq", {
        content: message.data,
        to:
          message.data.creater === message.data.dialog.users[0]
            ? message.data.dialog.users[1]
            : message.data.dialog.users[0],
      });
      return message.data;
    } else {
      const dialogIdRes = await createDialogFx({
        id1: sessionStorage["id"],
        id2: userId,
      });
      await initialiseDialogFx({ userId, myId, page: 0 });

      const message = await MessagesApi.create({
        dialogId: dialogIdRes.data,
        myId,
        data,
      });

      socket.emit("qqq", {
        content: message.data,
        to:
          message.data.creater === message.data.dialog.users[0]
            ? message.data.dialog.users[1]
            : message.data.dialog.users[0],
      });

      return message.data;
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

export const HomeStore = createStore<HomeStoreTypes>({
  isInitialisedDialog: false,
  loadedDialog: false,
  currentUser: null,
  currentDialog: {
    id: "",
    isTyping: false,
    page: 0,
  },
  currentDialogMessages: [],
})
  .on(initialiseDialogFx.doneData, (state, data) => {
    return {
      ...state,
      currentUser: {
        name: data.name,
        id: data.userId,
        avatar: data.avatar,
        isOnline: data.isOnline,
      },
      currentDialog: {
        id: data.currentDialogID,
        isTyping: data.currentDialogTyping,
        page: 0,
      },
      currentDialogMessages: data.currentDialogMessages,
      isInitialisedDialog: true,
    };
  })
  .on(sendMessageFx.doneData, (state, data) => {
    return {
      ...state,
      currentDialogMessages: [...state.currentDialogMessages, data],
    };
  })
  .on(onScrollLoaderMessages.doneData, (state, data) => {
    if (data && data.messages) {
      if (!state.loadedDialog) {
        return {
          ...state,
          currentDialogMessages: data.messages,
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
          currentDialogMessages: data.messages,
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
      isInitialisedDialog: false,
      loadedDialog: false,
      currentUser: null,
      currentDialog: {
        id: "",
        isTyping: false,
        page: 0,
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
        currentDialogMessages: [data.message, ...state.currentDialogMessages ],
      };
    }
    return state;
  });
