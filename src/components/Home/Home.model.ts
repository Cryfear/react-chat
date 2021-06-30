import { createEffect, createStore } from "effector";
import { DialogsApi } from "../../api/DialogsApi";
import { MessagesApi } from "../../api/MessagesApi";
import { UsersApi } from "../../api/UsersApi";

interface HomeStoreTypes {
  currentUser: {
    name: string;
    id: string;
    avatar: string;
    isOnline: boolean;
  } | null;
  currentDialog: {
    id: string;
    isTyping: boolean;
  };
  currentDialogMessages: any[];
}

export const initialiseDialogFx = createEffect(
  async ({
    userId,
    myId
  }: {
    userId: string
    myId: string
  }) => {
    console.log('here')
    const dialog = await DialogsApi.find(userId, myId);
    const user = await UsersApi.findUser(userId);
    const messages = await MessagesApi.getDialogMessages(dialog.data._id);

    return {
      name: user.data.fullName,
      userId: user.data.id,
      avatar: user.data.avatar,
      isOnline: user.data.isOnline,

      currentDialogID: dialog.data._id,
      currentDialogTyping: dialog.data.isTyping,
      currentDialogMessages: messages.data
    };
  }
);

export const sendMessageFx = createEffect(
  async ({ dialogId, myId, data }: any) => {
    const message = await MessagesApi.create(dialogId, myId, data);
    console.log(message);
  }
);

export const HomeStore = createStore<HomeStoreTypes>({
  currentUser: null,
  currentDialog: {
    id: "",
    isTyping: false,
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
      },
      currentDialogMessages: data.currentDialogMessages
    };
  });
